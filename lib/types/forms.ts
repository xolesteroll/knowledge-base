import { lessons, categories } from "@/db/schema"

export interface CreateLessonFormProps {
    // formData: typeof lessons.$inferInsert;
    categories: typeof categories.$inferSelect[];
}