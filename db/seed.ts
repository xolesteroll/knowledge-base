import { db } from './db';
import { users, lessons, userRoles } from './schema';

// Use built-in crypto to avoid adding uuid dependency
const { randomUUID } = require('crypto');

async function seed() {
  try {
    console.log('Seeding database...');

    // Create users (generate ids so we can reference them)
    const userData = [
      {
        id: randomUUID(),
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        phone: null,
        level: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        firstName: 'Player',
        lastName: 'One',
        email: 'player@example.com',
        phone: null,
        level: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        firstName: 'Coach',
        lastName: 'Smith',
        email: 'coach@example.com',
        phone: null,
        level: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Insert users
    for (const u of userData) {
      await db.insert(users).values(u);
    }

    // Assign roles
    const roles = ['admin', 'player', 'coach'] as const;
    for (let i = 0; i < userData.length; i++) {
      await db.insert(userRoles).values({ userId: userData[i].id, role: roles[i], createdAt: new Date() });
    }

    // Create lessons
    const lessonsData = [
      {
        id: randomUUID(),
        title: 'Intro to Chess',
        slug: 'intro-to-chess',
        content: [{ type: 'paragraph', content: 'Welcome to chess!' }],
        createdBy: userData[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: null,
        averageRating: 0,
        ratingCount: 0,
        category: 'board-games',
        tags: ['chess', 'beginner'],
        isPublished: true,
        publishedAt: new Date(),
      },
      {
        id: randomUUID(),
        title: 'Advanced Openings',
        slug: 'advanced-openings',
        content: [{ type: 'paragraph', content: 'Deep dive into openings.' }],
        createdBy: userData[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: null,
        averageRating: 0,
        ratingCount: 0,
        category: 'strategy',
        tags: ['openings', 'advanced'],
        isPublished: false,
        publishedAt: null,
      },
      {
        id: randomUUID(),
        title: 'Tactics Drills',
        slug: 'tactics-drills',
        content: [{ type: 'paragraph', content: 'Practice tactical puzzles.' }],
        createdBy: userData[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedBy: null,
        averageRating: 0,
        ratingCount: 0,
        category: 'training',
        tags: ['tactics', 'puzzles'],
        isPublished: true,
        publishedAt: new Date(),
      },
    ];

    for (const l of lessonsData) {
      await db.insert(lessons).values(l);
    }

    console.log('Seeding finished.');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exitCode = 1;
  } finally {
    // some drizzle clients have a close method, but neon-http doesn't need it
    process.exit();
  }
}

seed();
