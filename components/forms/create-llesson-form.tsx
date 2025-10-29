'use client';

import React, { useState } from 'react';
import { $getRoot } from 'lexical';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { createLesson } from '@/lib/actions';
import { CreateLessonFormProps } from '@/lib/types/forms';

function EditorCapturePlugin({ onContentChange }: { onContentChange: (content: string) => void }) {
    const [editor] = useLexicalComposerContext();

    editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
            const root = $getRoot();
            onContentChange(JSON.stringify(editorState.toJSON()));
        });
    });

    return null;
}

const initialConfig = {
    namespace: 'LessonEditor',
    theme: {},
    onError: (error: Error) => console.error(error),
};


export const CreateLessonForm = ({
    categories
}: CreateLessonFormProps) => {
    const [content, setContent] = useState('');
    console.log('Categories in form:', categories);
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
                <div className="border border-gray-300 rounded-md">
                    <LexicalComposer initialConfig={initialConfig}>
                        <RichTextPlugin
                            contentEditable={
                                <ContentEditable className="min-h-96 p-4 outline-none" />
                            }
                            placeholder={
                                <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
                                    Enter lesson content...
                                </div>
                            }
                            ErrorBoundary={LexicalErrorBoundary}
                        />
                        <HistoryPlugin />
                        <EditorCapturePlugin onContentChange={setContent} />
                    </LexicalComposer>
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