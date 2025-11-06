'use client';

import React, { useState } from 'react';
import { createLesson } from '@/lib/actions';
import { CreateLessonFormProps } from '@/lib/types/forms';
import TextEditor from '../tiptap/tiptap-editor';


export const CreateLessonForm = ({
    categories
}: CreateLessonFormProps) => {
    const [content, setContent] = useState('');
    console.log(content);
    return (
        <form action={createLesson} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                    Title
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {
                        categories && categories.length > 0 ? (
                            categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>No categories available</option>
                        )
                    }
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium mb-2">
                    Content
                </label>
                <div className="border border-gray-300 rounded-md relative">
                    <TextEditor onEditorChange={(jsonContent) => setContent(JSON.stringify(jsonContent))} />
                </div>
                <input type="hidden" name="content" value={content} />
            </div>

            <div className="flex gap-4">
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create Lesson
                </button>
                <button
                    type="button"
                    className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};