import StarterKit from '@tiptap/starter-kit'
import BulletList from '@tiptap/extension-bullet-list'
import BoldText from '@tiptap/extension-bold'
import Paragraph from '@tiptap/extension-paragraph'
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import ItalicText from '@tiptap/extension-italic'
import Heading from '@tiptap/extension-heading'

const myHeading = Heading.configure({
    levels: [1, 2, 3],
})

export { myHeading as Heading }
export { BoldText }
export { ItalicText }
export { BulletList }
export { Paragraph }
export { Document }
export { Text }
export { StarterKit }
