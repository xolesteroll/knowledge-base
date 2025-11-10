

import { CreateLessonForm } from '@/components/forms/create-lesson-form';
import { EditLessonForm } from '@/components/forms/edit-lesson-form';
import { getAllCategories, getLessonById } from '@/db/queries';


export default async function EditLessonPage({ params }: { params: { id: `${string}-${string}-${string}-${string}-${string}` } }) {
    const {id} = await params;

    if (!id) {
        return <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Lesson Not Found</h1>
            <p>The lesson you are trying to edit does not exist.</p>
        </div>
    }

    const lesson = await getLessonById(id); // Fetch the lesson to edit
    const categories = await getAllCategories(); // Fetch categories from the database or API

    if (!lesson) {
        return <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Lesson Not Found</h1>
            <p>The lesson you are trying to edit does not exist.</p>
        </div>
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <h1 className="text-3xl font-bold mb-8">Edit Lesson</h1>
            <EditLessonForm lesson={lesson} categories={categories} />
        </div>
    );
}