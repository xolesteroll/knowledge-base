
import DeleteLessonForm from '@/components/forms/delete-lesson-form';
import { Button } from '@/components/ui/button';
import { getLessonById, getUserById } from '@/db/queries';
import { UUID } from 'crypto';
import { notFound } from 'next/navigation';

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

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between absolute top-8 left-0 right-0 px-4 bg-background">
                <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>

                <div className="flex items-center gap-6">
                    <DeleteLessonForm lessonId={id as UUID} />
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
            <p className="mt-4">
                <strong>Author:</strong> {lessonAuthor}
            </p>
        </div>
    );
}