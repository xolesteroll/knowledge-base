import { pgTable, text, varchar, timestamp, integer, jsonb, pgEnum, uuid, boolean, primaryKey, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const roleEnum = pgEnum('role', ['admin', 'player', 'coach']);
export const activityTypeEnum = pgEnum('activity_type', ['lesson_created', 'lesson_updated', 'comment_added', 'user_joined', 'announcement']);

// Users Table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  firstName: varchar('first_name', { length: 100 }).notNull(),
  lastName: varchar('last_name', { length: 100 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  phone: varchar('phone', { length: 20 }),
  level: integer('level').notNull().default(0), // 0-12
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  emailIdx: index('email_idx').on(table.email),
  levelIdx: index('level_idx').on(table.level),
}));

// User Roles (many-to-many)
export const userRoles = pgTable('user_roles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  role: roleEnum('role').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  userIdIdx: index('user_roles_user_id_idx').on(table.userId),
}));

// Lessons Table
export const lessons = pgTable('lessons', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  
  // Store content as structured JSON blocks
  // Example: [{ type: 'paragraph', content: 'text' }, { type: 'image', url: '...' }]
  content: jsonb('content').notNull(),
  
  // Alternative: if you prefer raw HTML
  // contentHtml: text('content_html').notNull(),
  
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
}, (table) => ({
  slugIdx: index('lessons_slug_idx').on(table.slug),
  createdByIdx: index('lessons_created_by_idx').on(table.createdBy),
  categoryIdx: index('lessons_category_idx').on(table.category),
}));

// Lesson Images (for additional images/media)
export const lessonImages = pgTable('lesson_images', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  alt: varchar('alt', { length: 255 }),
  caption: text('caption'),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => ({
  lessonIdIdx: index('lesson_images_lesson_id_idx').on(table.lessonId),
}));

// User Lesson Progress (track which lessons users have viewed)
export const userLessonProgress = pgTable('user_lesson_progress', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  viewedAt: timestamp('viewed_at').defaultNow().notNull(),
  completed: boolean('completed').default(false).notNull(),
  completedAt: timestamp('completed_at'),
  lastViewedAt: timestamp('last_viewed_at').defaultNow().notNull(),
}, (table) => ({
  userLessonIdx: index('user_lesson_progress_user_lesson_idx').on(table.userId, table.lessonId),
}));

// Lesson Ratings
export const lessonRatings = pgTable('lesson_ratings', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(), // 1-10
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  pk: primaryKey({ columns: [table.userId, table.lessonId] }),
}));

// Comments Table
export const comments = pgTable('comments', {
  id: uuid('id').primaryKey().defaultRandom(),
  lessonId: uuid('lesson_id').notNull().references(() => lessons.id, { onDelete: 'cascade' }),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  parentId: uuid('parent_id'), // for nested comments - self-reference handled in relations
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => ({
  lessonIdIdx: index('comments_lesson_id_idx').on(table.lessonId),
  userIdIdx: index('comments_user_id_idx').on(table.userId),
  parentIdIdx: index('comments_parent_id_idx').on(table.parentId),
}));

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
}, (table) => ({
  typeIdx: index('activity_feed_type_idx').on(table.type),
  createdAtIdx: index('activity_feed_created_at_idx').on(table.createdAt),
  announcementIdx: index('activity_feed_announcement_idx').on(table.isAnnouncement),
}));

// Relations (for Drizzle queries)
export const usersRelations = relations(users, ({ many }) => ({
  roles: many(userRoles),
  createdLessons: many(lessons, { relationName: 'createdLessons' }),
  comments: many(comments),
  lessonProgress: many(userLessonProgress),
  lessonRatings: many(lessonRatings),
  activities: many(activityFeed, { relationName: 'userActivities' }),
}));

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  creator: one(users, {
    fields: [lessons.createdBy],
    references: [users.id],
    relationName: 'createdLessons',
  }),
  updater: one(users, {
    fields: [lessons.updatedBy],
    references: [users.id],
  }),
  images: many(lessonImages),
  comments: many(comments),
  userProgress: many(userLessonProgress),
  ratings: many(lessonRatings),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
}));

export const lessonImagesRelations = relations(lessonImages, ({ one }) => ({
  lesson: one(lessons, {
    fields: [lessonImages.lessonId],
    references: [lessons.id],
  }),
}));

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

export const activityFeedRelations = relations(activityFeed, ({ one }) => ({
  lesson: one(lessons, {
    fields: [activityFeed.lessonId],
    references: [lessons.id],
  }),
  user: one(users, {
    fields: [activityFeed.userId],
    references: [users.id],
  }),
  creator: one(users, {
    fields: [activityFeed.createdBy],
    references: [users.id],
  }),
}));

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
  replies: many(comments, { 
    relationName: 'commentReplies',
  }),
}));