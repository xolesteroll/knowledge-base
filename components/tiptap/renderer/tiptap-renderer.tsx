'use client'


import { generateHTML } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
// import {renderToHTMLString} from '@tiptap/'

export default function TiptapRenderer({ content }: { content: JSON }) {
    console.log('Rendering content:', content);
    const html = generateHTML(content as JSON, [StarterKit]);
    console.log('Generated HTML:', html);
    return (
        <div className='tiptap' dangerouslySetInnerHTML={{__html: html}} />
    )
}