import { pgTable, text, varchar, timestamp, integer, jsonb, pgEnum, uuid, boolean, primaryKey, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import type { AdapterAccountType } from "@auth/core/adapters";

// Enums
export const roleEnum = pgEnum('role', ['admin', 'player', 'coach']);
export const activityTypeEnum = pgEnum('activity_type', ['lesson_created', 'lesson_updated', 'comment_added', 'user_joined', 'announcement']);

// Categories Table (Hierarchical)
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  parentId: uuid('parent_id'), // Self-reference for hierarchy
  level: integer('level').notNull().default(0), // 0 = root, 1 = first child, etc.
  order: integer('order').notNull().default(0), // For sorting within same level
  icon: varchar('icon', { length: 50 }), // Optional icon name (e.g., 'ball', 'trophy')
  color: varchar('color', { length: 7 }), // Optional hex color (e.g., '#3B82F6')
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('categories_slug_idx').on(table.slug),
  index('categories_parent_id_idx').on(table.parentId),
  index('categories_level_idx').on(table.level),
]);

// Lesson Categories Junction Table (Many-to-Many)
export const lessonCategories = pgTable('lesson_categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  categoryId: uuid('category_id').notNull().references(() => categories.id, { onDelete: 'cascade' }),
  isPrimary: boolean('is_primary').default(false).notNull(), // Mark one category as primary
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('lesson_categories_lesson_id_idx').on(table.lessonId),
  index('lesson_categories_category_id_idx').on(table.categoryId),
  index('unique_lesson_category').on(table.lessonId, table.categoryId),
]);

// Sessions Table - REQUIRED for database session strategy
export const sessions = pgTable('sessions', {
  sessionToken: varchar('session_token', { length: 255 }).notNull().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  // Optional: Add these for monitoring
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  lastActive: timestamp('last_active').defaultNow().notNull(),
}, (table) => [
  index('sessions_user_id_idx').on(table.userId),
  index('sessions_expires_idx').on(table.expires),
]);

export const verificationTokens = pgTable('verification_tokens', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expires: timestamp('expires').notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.identifier, table.token] }),
}));

export const accounts = pgTable(
  "accounts",
  {
    userId: uuid("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => [
    {
      compoundKey: primaryKey({
        columns: [account.provider, account.providerAccountId],
      }),
    },
  ]
)
 

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }),
  imageUrl: varchar('avatar', { length: 255 }),
  level: integer('level').notNull().default(0), // 0-12
  emailVerified: timestamp('email_verified'),

  // fields for drizzle adapter
  name: varchar('name', { length: 200 }),
  image: varchar('image', { length: 255 }),

  isVerified: boolean('is_verified').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('email_idx').on(table.email),
  index('level_idx').on(table.level),
]);

// User Roles (many-to-many)
export const userRoles = pgTable('user_roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: roleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('user_roles_user_id_idx').on(table.userId),
]);

// Lessons Table
export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),

  // Store content as structured JSON blocks
  // Example: [{ type: 'paragraph', content: 'text' }, { type: 'image', url: '...' }]
  content: jsonb('content').$type<JSON>().notNull(),

  // Alternative: if you prefer raw HTML
  // content: text('content').notNull(),

  createdBy: uuid('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedBy: uuid('updated_by').references(() => users.id),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),

  // Average rating calculated from lesson_ratings table
  averageRating: integer('average_rating').default(0),
  ratingCount: integer('rating_count').default(0),

  // For organizing lessons
  category: varchar('category', { length: 100 }),
  tags: jsonb('tags').$type<string[]>().default([]),

  isPublished: boolean('is_published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
}, (table) => [
  index('lessons_slug_idx').on(table.slug),
  index('lessons_created_by_idx').on(table.createdBy),
  index('lessons_category_idx').on(table.category),
]);

// Lesson Images (for additional images/media)
export const lessonImages = pgTable('lesson_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  alt: varchar('alt', { length: 255 }),
  caption: text('caption'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
  index('lesson_images_lesson_id_idx').on(table.lessonId),
]);

// User Lesson Progress (track which lessons users have viewed)
export const userLessonProgress = pgTable('user_lesson_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  viewedAt: timestamp('viewed_at').defaultNow().notNull(),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  lastViewedAt: timestamp('last_viewed_at').defaultNow().notNull(),
}, (table) => [
  index('user_lesson_progress_user_lesson_idx').on(table.userId, table.lessonId),
]);

// Lesson Ratings
export const lessonRatings = pgTable('lesson_ratings', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(), // 1-10
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  primaryKey({ columns: [table.userId, table.lessonId] }),
]);

// Comments Table
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  parentId: uuid('parent_id').references((): any => comments.id, { onDelete: 'cascade' }), // for nested comments
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => [
  index('comments_lesson_id_idx').on(table.lessonId),
  index('comments_user_id_idx').on(table.userId),
]);

// Activity Feed / Announcements
export const activityFeed = pgTable('activity_feed', {
  id: uuid('id').primaryKey().defaultRandom(),
  type: activityTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),

  // Optional: link to related entities
  lessonId: uuid('lesson_id').references(() => lessons.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),

  // Creator (null for auto-generated activities)
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),

  rating: integer('rating'), // 1-10 (optional)

  isAnnouncement: boolean('is_announcement').default(false).notNull(),
  isPinned: boolean('is_pinned').default(false).notNull(),
}, (table) => [
  index('activity_feed_type_idx').on(table.type),
  index('activity_feed_created_at_idx').on(table.createdAt),
  index('activity_feed_announcement_idx').on(table.isAnnouncement),
]);

// Relations (for Drizzle queries)
// Relations for sessions
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

// Categories Relations
export const categoriesRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id],
    relationName: 'categoryHierarchy',
  }),
  children: many(categories, {
    relationName: 'categoryHierarchy',
  }),
  lessonCategories: many(lessonCategories),
}));

// Lesson Categories Relations
export const lessonCategoriesRelations = relations(lessonCategories, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonCategories.lessonId],
    references: [lessons.id],
  }),
  category: one(categories, {
    fields: [lessonCategories.categoryId],
    references: [categories.id],
  }),
}));

// Users Relations
export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles),
  sessions: many(sessions),
  createdLessons: many(lessons, { relationName: 'createdLessons' }),
  updatedLessons: many(lessons, { relationName: 'updatedLessons' }),
  comments: many(comments),
  lessonProgress: many(userLessonProgress),
  lessonRatings: many(lessonRatings),
  userActivities: many(activityFeed, { relationName: 'userActivities' }),
  createdActivities: many(activityFeed, { relationName: 'createdActivities' }),
}));

// User Roles Relations
export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
}));

// Lessons Relations
export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  creator: one(users, {
    fields: [lessons.createdBy],
    references: [users.id],
    relationName: 'createdLessons',
  }),
  updater: one(users, {
    fields: [lessons.updatedBy],
    references: [users.id],
    relationName: 'updatedLessons',
  }),
  lessonCategories: many(lessonCategories),
  images: many(lessonImages),
  comments: many(comments),
  userProgress: many(userLessonProgress),
  ratings: many(lessonRatings),
}));

// Lesson Images Relations
export const lessonImagesRelations = relations(lessonImages, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonImages.lessonId],
    references: [lessons.id],
  }),
}));

// User Lesson Progress Relations
export const userLessonProgressRelations = relations(userLessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [userLessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [userLessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

// Lesson Ratings Relations
export const lessonRatingsRelations = relations(lessonRatings, ({ one }) => ({
  user: one(users, {
    fields: [lessonRatings.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [lessonRatings.lessonId],
    references: [lessons.id],
  }),
}));

// Comments Relations
export const commentsRelations = relations(comments, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [comments.lessonId],
    references: [lessons.id],
  }),
  user: one(users, {
    fields: [comments.userId],
    references: [users.id],
  }),
  parent: one(comments, {
    fields: [comments.parentId],
    references: [comments.id],
    relationName: 'commentReplies',
  }),
  replies: many(comments, { relationName: 'commentReplies' }),
}));

// Activity Feed Relations
export const activityFeedRelations = relations(activityFeed, ({ one }) => ({
  lesson: one(lessons, {
    fields: [activityFeed.lessonId],
    references: [lessons.id],
  }),
  user: one(users, {
    fields: [activityFeed.userId],
    references: [users.id],
    relationName: 'userActivities',
  }),
  creator: one(users, {
    fields: [activityFeed.createdBy],
    references: [users.id],
    relationName: 'createdActivities',
  }),
}));