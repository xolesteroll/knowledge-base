
import DeleteLessonForm from '@/components/forms/delete-lesson-form';
import { Button } from '@/components/ui/button';
import { getLessonById, getUserById } from '@/db/queries';
import { UUID } from 'crypto';
import { notFound } from 'next/navigation';
import TiptapRenderer from '@/components/tiptap/renderer/tiptap-renderer';
import Link from 'next/link';

interface LessonPageProps {
    params: {
        id: string;
    };
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { id } = await params;
    const lesson = await getLessonById(id as UUID);
    const lessonAuthor = await getUserById(lesson?.createdBy as UUID)?.then(user => user ? `${user.firstName} ${user.lastName}` : 'Unknown Author');

    if (!lesson) {
        notFound();
    }

    console.log(lesson.content);

    return (
        <div className="container mx-auto px-4 py-8 relative">
            <div className="flex items-center justify-between sticky top-0 left-0 right-0 px-4 bg-background">
                <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

                <div className="flex items-center gap-6">
                    <Link href={`/lessons/edit/${id}`}>
                        <Button variant="outline">Edit Lesson</Button>
                    </Link>
                    <DeleteLessonForm lessonId={id as UUID} />
                </div>
            </div>
            <div>
                <TiptapRenderer content={lesson.content as JSON} />
            </div>
            <div className="mt-4 sticky bottom-0 left-0 right-0 px-4 bg-background text-sm">
                <span className="font-medium">Published:</span> {new Date(lesson.createdAt).toLocaleDateString()}
                <span className="mx-2">|</span>
                <span className="font-medium">Updated:</span> {new Date(lesson.updatedAt).toLocaleDateString()}
                <span className="mx-2">|</span>
                <strong>Author:</strong> {lessonAuthor}
            </div>
        </div>
    );
}