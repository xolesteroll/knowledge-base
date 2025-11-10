import { lessons, categories } from "@/db/schema"

export interface CreateLessonFormProps {
    // formData: typeof lessons.$inferInsert;
    categories: typeof categories.$inferSelect[];
}

export interface EditLessonFormProps {
    // formData: typeof lessons.$inferInsert;
    categories: typeof categories.$inferSelect[];
    lesson: typeof lessons.$inferSelect;
}