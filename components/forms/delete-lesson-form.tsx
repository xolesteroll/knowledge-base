import { UUID } from "crypto";
import { Button } from "../ui/button";
import { deleteLesson } from "@/lib/actions";

export default function DeleteLessonForm({ lessonId }: { lessonId: UUID }) {
    return (
        <form action={deleteLesson.bind(null, lessonId)}>
            <Button
                type="submit"
                variant="destructive"
            >
                Delete Lesson
            </Button>
        </form>
    );
}