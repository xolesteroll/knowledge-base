import { UUID } from "crypto";
import { Button } from "../ui/button";
import { deleteLesson } from "@/lib/actions";

export default function DeleteLessonForm({ lessonId }: { lessonId: UUID }) {
    return (
        <form action={deleteLesson.bind(null, lessonId)}>
            <Button
                type="submit"
                variant="destructive"
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
                Delete Lesson
            </Button>
        </form>
    );
}