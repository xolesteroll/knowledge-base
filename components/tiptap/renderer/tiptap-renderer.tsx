
'use client';

import { renderToHTMLString } from '@tiptap/static-renderer';
import tiptapExtensions from '../extensions';

export default function TiptapRenderer({ content }: { content: JSON }) {
    const html = renderToHTMLString({ content: content as JSON, extensions: tiptapExtensions });
    return (
        <div className='tiptap' dangerouslySetInnerHTML={{ __html: html }} />
    )
}   