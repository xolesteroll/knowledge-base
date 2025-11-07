export { default as StarterKit } from '@tiptap/starter-kit'
export { default as BulletList } from '@tiptap/extension-bullet-list'
export { default as BoldText } from '@tiptap/extension-bold'
export { default as Document } from '@tiptap/extension-document'
export { default as Paragraph } from '@tiptap/extension-paragraph'
export { default as Text } from '@tiptap/extension-text'
export { default as ItalicText } from '@tiptap/extension-italic'
import { Heading } from '@tiptap/extension-heading'

const myHeading = Heading.configure({
    levels: [1, 2, 3],
})

export { myHeading as Heading }