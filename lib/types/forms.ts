import { lessons, categories } from "@/db/schema"
import { success } from "zod";

export interface CreateLessonFormProps {
    // formData: typeof lessons.$inferInsert;
    categories: typeof categories.$inferSelect[];
}

export interface EditLessonFormProps {
    // formData: typeof lessons.$inferInsert;
    categories: typeof categories.$inferSelect[];
    lesson: typeof lessons.$inferSelect;
}

export type AuthFormsState = { error: string; success?: undefined; } | { success: boolean; error?: undefined; }