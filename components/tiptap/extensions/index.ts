import Emoji, { emojis } from "@tiptap/extension-emoji";
import { Extensions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import POKER_DECK from  "../data/poker-deck";

const tiptapExtensions: Extensions = [StarterKit, Emoji.configure({
    emojis: [...emojis, ...POKER_DECK]
})];
export default tiptapExtensions;