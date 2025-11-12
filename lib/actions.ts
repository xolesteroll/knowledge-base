"use server";

import { db } from "@/db/db";
import { lessons } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { slugify } from "./utils";
import { deleteLessonById } from "@/db/queries";
import { UUID } from "crypto";
import { eq } from "drizzle-orm";



export async function createLesson(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as unknown as JSON;
    const categoryId = formData.get("category") as string;
    console.log('Creating lesson with categoryId:', formData);
    if (!title || !content || !categoryId) {
        throw new Error("All fields are required");
    }

    try {
        // Add your database logic here
        await db.insert(lessons).values({
            slug: slugify(title),
            title,
            content,
            createdBy: '2fd4bf36-01b0-496c-82dd-145b253bded4',
            publishedAt: new Date(),
        });
    } catch (error) {
        console.error("Error creating lesson:", error);
        throw new Error("Failed to create lesson");
    }

    revalidatePath("/lessons");
    redirect("/lessons");
}

export async function updateLesson(formData: FormData) {
    const title = formData.get("title") as string;
    const content = formData.get("content") as unknown as JSON;
    const categoryId = formData.get("category") as string;
    const lessonId = formData.get("id") as UUID;
    console.log(content);
    if (!title || !content || !categoryId) {
        throw new Error("All fields are required");
    }
    try {
        // Add your database logic here
        await db.update(lessons).set({
            slug: slugify(title),
            title,
            content,
        }).where(eq(lessons.id, lessonId));
    }
    catch (error) {
        console.error("Error editing lesson:", error);
        throw new Error("Failed to edit lesson");
    }
    revalidatePath("/lessons");
    redirect("/lessons");
}

export async function deleteLesson(lessonId: UUID) {
    if (!lessonId) {
        throw new Error("Lesson ID is required");
    }
    try {
        await deleteLessonById(lessonId);
    } catch (error) {
        console.error("Error deleting lesson:", error);
        throw new Error("Failed to delete lesson");
    }
        revalidatePath("/lessons");
        redirect("/lessons");
    }