'use client'

import * as EditorExtensions from '../extensions'
import { generateHTML } from '@tiptap/react';
// import {renderToHTMLString} from '@tiptap/'

export default function TiptapRenderer({ content }: { content: JSON }) {
    console.log('Rendering content:', content);
    const html = generateHTML(content as JSON, Array.from(Object.values(EditorExtensions)));
    console.log('Generated HTML:', html);
    return (
        <div className='tiptap' dangerouslySetInnerHTML={{__html: html}} />
    )
}