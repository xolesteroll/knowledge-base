'use client'

import { useEditor, EditorContent, EditorContext, useEditorState } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import BulletList from '@tiptap/extension-bullet-list'
import BoldText from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import ItalicText from '@tiptap/extension-italic'

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'
import { useMemo } from 'react'

const TextEditor = (
    {
        onEditorChange,
    }:
        {
            onEditorChange?: (jsonContent: JSON) => void
        }
) => {
    const editor = useEditor({
        extensions: [StarterKit,
            BulletList,
            BoldText,
            ItalicText,
            Document,
            Paragraph,
            Text,
            Heading.configure({
                levels: [1, 2, 3],
            }),],

        content: '<p>Hello World! 🌎️</p>',
        // Don't render immediately on the server to avoid SSR issues
        immediatelyRender: false,
    })

    const editoreState = useEditorState({
        editor,

        selector: (editor) => {
            if (!editor) return null

            return {
                isEditable: editor.editor?.isEditable,
                currentSelection: editor.editor?.state.selection,
                currentContent: editor.editor?.getJSON(),
            }
        },
    })

    const providerValue = useMemo(() => ({ editor }), [editor])

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

    const logState = () => {
        if (editor) {
            console.log(editoreState?.currentContent);
        }
    }

    return (
        <EditorContext.Provider value={providerValue}>
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

            </ToggleGroup>
            <EditorContent editor={editor} onChange={logState} />
        </EditorContext.Provider>
    )
}

export default TextEditor