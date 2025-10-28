
import { getLessonById } from '@/db/queries';
import { UUID } from 'crypto';
import { notFound } from 'next/navigation';

interface LessonPageProps {
    params: {
        id: string;
    };
}

export default async function LessonPage({ params }: LessonPageProps) {
    const lesson = await getLessonById(params.id as UUID);

    if (!lesson) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: lesson.content }} />
        </div>
    );
}