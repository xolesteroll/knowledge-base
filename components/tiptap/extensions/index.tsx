export { StarterKit } from '@tiptap/starter-kit'
export { BulletList } from '@tiptap/extension-bullet-list'
import BoldText from '@tiptap/extension-bold'
export { Document } from '@tiptap/extension-document'
export { Paragraph } from '@tiptap/extension-paragraph'
export { Text } from '@tiptap/extension-text'
import ItalicText from '@tiptap/extension-italic'
import { Heading } from '@tiptap/extension-heading'

const myHeading = Heading.configure({
    levels: [1, 2, 3],
})

export { myHeading as Heading }
export { BoldText }
export { ItalicText }