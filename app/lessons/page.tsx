import { Button } from '@/components/ui/button';
import { getAllLessons } from '@/db/queries';
import { sql } from 'drizzle-orm';
import Link from 'next/link';
import React from 'react';

export default async function LessonsPage() {
    const lessons = await getAllLessons(); // Fetch lessons from an API or database
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Lessons Page</h1>
            <Button asChild>
                <Link href="/lessons/create">Create New Lesson</Link>
            </Button>
            {
                lessons.map(lesson => (
                    <div key={lesson.id} className="mb-4">
                        <h2 className="text-xl font-semibold">
                            <Link href={`/lessons/${lesson.id}`}>
                                {lesson.title}
                            </Link>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 mt-2">
                            <p>Created At: {lesson.createdAt.toLocaleDateString()}</p>
                            <p>Updated At: {lesson.updatedAt.toLocaleDateString()}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}