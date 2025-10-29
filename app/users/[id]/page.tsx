
import { getUserById } from '@/db/queries';
import { UUID } from 'crypto';
import { notFound } from 'next/navigation';

interface LessonPageProps {
    params: {
        id: string;
    };
}

export default async function LessonPage({ params }: LessonPageProps) {
    const { id } = await params;
    const user = await getUserById(id as UUID);
    if (!user) {
        notFound();
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-4">{user.firstName} {user.lastName}</h1>
            <p>Email: {user.email}</p>
            <p>Joined: {user.createdAt.toLocaleDateString()}</p>
        </div>
    );
}