import { UUID } from 'crypto';
import { db } from './db';
import { lessons, users } from './schema';
import { eq } from 'drizzle-orm';

export async function getAllLessons() {
    return await db.query.lessons.findMany();
};
export async function getLessonById(id: UUID) {
    return await db.query.lessons.findFirst({
        where: eq(lessons.id, id)
    });
}
export async function getAllUsers() {
    return await db.query.users.findMany();
}
export async function getUserById(id: UUID) {
    return await db.query.users.findFirst({
        where: eq(users.id, id)
    });
}