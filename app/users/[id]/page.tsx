
import { getLessonById, getUserById } from '@/db/queries';
import { UUID } from 'crypto';
import { notFound } from 'next/navigation';

interface LessonPageProps {
    params: {
        id: string;
    };
}

export default async function LessonPage({ params }: LessonPageProps) {
    const lesson = await getUserById(params.id as UUID);

    if (!lesson) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{lesson.firstName} {lesson.lastName}</h1>
            <p>Email: {lesson.email}</p>
            <p>Joined: {lesson.createdAt.toLocaleDateString()}</p>
        </div>
    );
}