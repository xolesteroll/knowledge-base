

import { CreateLessonForm } from '@/components/forms/create-llesson-form';
import { getAllCategories } from '@/db/queries';


export default async function CreateLessonPage() {
    const categories = await getAllCategories(); // Fetch categories from the database or API
    

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Create New Lesson</h1>

            <CreateLessonForm categories={categories} />
        </div>
    );
}