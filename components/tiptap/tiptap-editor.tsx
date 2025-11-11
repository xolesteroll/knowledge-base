'use client'

import { useEditor, EditorContent, EditorContext, useEditorState } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import Emoji, { emojis } from '@tiptap/extension-emoji'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { EmojiPicker } from './components/emoji-picker'
import { PokerDeckPicker } from './components/poker-deck-picker'
import tiptapExtensions from './extensions'

const TextEditor = (
    {
        content,
        onEditorChange,
    }:
        {
            content?: JSON | undefined,
            onEditorChange?: (jsonContent: JSON) => void
        }
) => {
    const editor = useEditor({
        extensions: tiptapExtensions,

        content: content || '<p>Hello World! 🌎️</p>',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            const jsonContent = editor.getJSON() as unknown as JSON;
            onEditorChange?.(jsonContent)
        }
    })

    const toggleBulletList = () => {
        if (editor) {
            editor.commands.toggleBulletList()
        }
    }
    const toggleBold = () => {
        if (editor) {
            editor.commands.toggleBold()
        }
    }

    const toggleItalic = () => {
        if (editor) {
            editor.commands.toggleItalic()
        }
    }

    const toggleNumberedList = () => {
        if (editor) {
            editor.commands.toggleOrderedList()
        }
    }

    const handleEmojiSelect = (emojiName: string) => {
        if (editor) {
            editor.chain().focus().setEmoji(emojiName).run()
        }
    }

    const handleCardSelect = (cardName: string) => {
        if (editor) {
            editor.chain().focus().setEmoji(cardName).run()
        }
    }

    return (
        <div>
            <ToggleGroup type='multiple' spacing={1}>
                <ToggleGroupItem
                    value="bold"
                    onClick={toggleBold}
                >B</ToggleGroupItem>
                <ToggleGroupItem
                    value="italic"
                    onClick={toggleItalic}
                >I</ToggleGroupItem>
                <ToggleGroupItem
                    value="bulletList"
                    onClick={toggleBulletList}
                >• List</ToggleGroupItem>
                <ToggleGroupItem
                    value="numberedList"
                    onClick={toggleNumberedList}
                >1. List</ToggleGroupItem>
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
                <PokerDeckPicker onCardSelect={handleCardSelect} />

            </ToggleGroup>
            <EditorContent editor={editor} />
        </div>
    )
}

export default TextEditor