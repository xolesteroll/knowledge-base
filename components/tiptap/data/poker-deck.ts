import { EmojiItem } from "@tiptap/extension-emoji";
// 54 playing cards - complete poker deck
const POKER_DECK: EmojiItem[] = [
    // Spades ♠
    { emoji: '🂡', name: 'ace_of_spades', shortcodes: ['ace_spades'], unicode: '1F0A1', tags: ['spades', 'ace'] },
    { emoji: '🂢', name: 'two_of_spades', shortcodes: ['two_spades'], unicode: '1F0A2', tags: ['spades', 'two'] },
    { emoji: '🂣', name: 'three_of_spades', shortcodes: ['three_spades'], unicode: '1F0A3', tags: ['spades', 'three'] },
    { emoji: '🂤', name: 'four_of_spades', shortcodes: ['four_spades'], unicode: '1F0A4', tags: ['spades', 'four'] },
    { emoji: '🂥', name: 'five_of_spades', shortcodes: ['five_spades'], unicode: '1F0A5', tags: ['spades', 'five'] },
    { emoji: '🂦', name: 'six_of_spades', shortcodes: ['six_spades'], unicode: '1F0A6', tags: ['spades', 'six'] },
    { emoji: '🂧', name: 'seven_of_spades', shortcodes: ['seven_spades'], unicode: '1F0A7', tags: ['spades', 'seven'] },
    { emoji: '🂨', name: 'eight_of_spades', shortcodes: ['eight_spades'], unicode: '1F0A8', tags: ['spades', 'eight'] },
    { emoji: '🂩', name: 'nine_of_spades', shortcodes: ['nine_spades'], unicode: '1F0A9', tags: ['spades', 'nine'] },
    { emoji: '🂪', name: 'ten_of_spades', shortcodes: ['ten_spades'], unicode: '1F0AA', tags: ['spades', 'ten'] },
    { emoji: '🂫', name: 'jack_of_spades', shortcodes: ['jack_spades'], unicode: '1F0AB', tags: ['spades', 'jack'] },
    { emoji: '🂭', name: 'queen_of_spades', shortcodes: ['queen_spades'], unicode: '1F0AD', tags: ['spades', 'queen'] },
    { emoji: '🂮', name: 'king_of_spades', shortcodes: ['king_spades'], unicode: '1F0AE', tags: ['spades', 'king'] },

    // Hearts ♥
    { emoji: '🂱', name: 'ace_of_hearts', shortcodes: ['ace_hearts'], unicode: '1F0B1', tags: ['hearts', 'ace'] },
    { emoji: '🂲', name: 'two_of_hearts', shortcodes: ['two_hearts'], unicode: '1F0B2', tags: ['hearts', 'two'] },
    { emoji: '🂳', name: 'three_of_hearts', shortcodes: ['three_hearts'], unicode: '1F0B3', tags: ['hearts', 'three'] },
    { emoji: '🂴', name: 'four_of_hearts', shortcodes: ['four_hearts'], unicode: '1F0B4', tags: ['hearts', 'four'] },
    { emoji: '🂵', name: 'five_of_hearts', shortcodes: ['five_hearts'], unicode: '1F0B5', tags: ['hearts', 'five'] },
    { emoji: '🂶', name: 'six_of_hearts', shortcodes: ['six_hearts'], unicode: '1F0B6', tags: ['hearts', 'six'] },
    { emoji: '🂷', name: 'seven_of_hearts', shortcodes: ['seven_hearts'], unicode: '1F0B7', tags: ['hearts', 'seven'] },
    { emoji: '🂸', name: 'eight_of_hearts', shortcodes: ['eight_hearts'], unicode: '1F0B8', tags: ['hearts', 'eight'] },
    { emoji: '🂹', name: 'nine_of_hearts', shortcodes: ['nine_hearts'], unicode: '1F0B9', tags: ['hearts', 'nine'] },
    { emoji: '🂺', name: 'ten_of_hearts', shortcodes: ['ten_hearts'], unicode: '1F0BA', tags: ['hearts', 'ten'] },
    { emoji: '🂻', name: 'jack_of_hearts', shortcodes: ['jack_hearts'], unicode: '1F0BB', tags: ['hearts', 'jack'] },
    { emoji: '🂽', name: 'queen_of_hearts', shortcodes: ['queen_hearts'], unicode: '1F0BD', tags: ['hearts', 'queen'] },
    { emoji: '🂾', name: 'king_of_hearts', shortcodes: ['king_hearts'], unicode: '1F0BE', tags: ['hearts', 'king'] },

    // Diamonds ♦
    { emoji: '🃁', name: 'ace_of_diamonds', shortcodes: ['ace_diamonds'], unicode: '1F0C1', tags: ['diamonds', 'ace'] },
    { emoji: '🃂', name: 'two_of_diamonds', shortcodes: ['two_diamonds'], unicode: '1F0C2', tags: ['diamonds', 'two'] },
    { emoji: '🃃', name: 'three_of_diamonds', shortcodes: ['three_diamonds'], unicode: '1F0C3', tags: ['diamonds', 'three'] },
    { emoji: '🃄', name: 'four_of_diamonds', shortcodes: ['four_diamonds'], unicode: '1F0C4', tags: ['diamonds', 'four'] },
    { emoji: '🃅', name: 'five_of_diamonds', shortcodes: ['five_diamonds'], unicode: '1F0C5', tags: ['diamonds', 'five'] },
    { emoji: '🃆', name: 'six_of_diamonds', shortcodes: ['six_diamonds'], unicode: '1F0C6', tags: ['diamonds', 'six'] },
    { emoji: '🃇', name: 'seven_of_diamonds', shortcodes: ['seven_diamonds'], unicode: '1F0C7', tags: ['diamonds', 'seven'] },
    { emoji: '🃈', name: 'eight_of_diamonds', shortcodes: ['eight_diamonds'], unicode: '1F0C8', tags: ['diamonds', 'eight'] },
    { emoji: '🃉', name: 'nine_of_diamonds', shortcodes: ['nine_diamonds'], unicode: '1F0C9', tags: ['diamonds', 'nine'] },
    { emoji: '🃊', name: 'ten_of_diamonds', shortcodes: ['ten_diamonds'], unicode: '1F0CA', tags: ['diamonds', 'ten'] },
    { emoji: '🃋', name: 'jack_of_diamonds', shortcodes: ['jack_diamonds'], unicode: '1F0CB', tags: ['diamonds', 'jack'] },
    { emoji: '🃍', name: 'queen_of_diamonds', shortcodes: ['queen_diamonds'], unicode: '1F0CD', tags: ['diamonds', 'queen'] },
    { emoji: '🃎', name: 'king_of_diamonds', shortcodes: ['king_diamonds'], unicode: '1F0CE', tags: ['diamonds', 'king'] },

    // Clubs ♣
    { emoji: '🃑', name: 'ace_of_clubs', shortcodes: ['ace_clubs'], unicode: '1F0D1', tags: ['clubs', 'ace'] },
    { emoji: '🃒', name: 'two_of_clubs', shortcodes: ['two_clubs'], unicode: '1F0D2', tags: ['clubs', 'two'] },
    { emoji: '🃓', name: 'three_of_clubs', shortcodes: ['three_clubs'], unicode: '1F0D3', tags: ['clubs', 'three'] },
    { emoji: '🃔', name: 'four_of_clubs', shortcodes: ['four_clubs'], unicode: '1F0D4', tags: ['clubs', 'four'] },
    { emoji: '🃕', name: 'five_of_clubs', shortcodes: ['five_clubs'], unicode: '1F0D5', tags: ['clubs', 'five'] },
    { emoji: '🃖', name: 'six_of_clubs', shortcodes: ['six_clubs'], unicode: '1F0D6', tags: ['clubs', 'six'] },
    { emoji: '🃗', name: 'seven_of_clubs', shortcodes: ['seven_clubs'], unicode: '1F0D7', tags: ['clubs', 'seven'] },
    { emoji: '🃘', name: 'eight_of_clubs', shortcodes: ['eight_clubs'], unicode: '1F0D8', tags: ['clubs', 'eight'] },
    { emoji: '🃙', name: 'nine_of_clubs', shortcodes: ['nine_clubs'], unicode: '1F0D9', tags: ['clubs', 'nine'] },
    { emoji: '🃚', name: 'ten_of_clubs', shortcodes: ['ten_clubs'], unicode: '1F0DA', tags: ['clubs', 'ten'] },
    { emoji: '🃛', name: 'jack_of_clubs', shortcodes: ['jack_clubs'], unicode: '1F0DB', tags: ['clubs', 'jack'] },
    { emoji: '🃝', name: 'queen_of_clubs', shortcodes: ['queen_clubs'], unicode: '1F0DD', tags: ['clubs', 'queen'] },
    { emoji: '🃞', name: 'king_of_clubs', shortcodes: ['king_clubs'], unicode: '1F0DE', tags: ['clubs', 'king'] },

    // Jokers
    { emoji: '🃏', name: 'joker', shortcodes: ['joker'], unicode: '1F0CF', tags: ['joker'] },
    { emoji: '🂿', name: 'joker_white', shortcodes: ['joker_white'], unicode: '1F0BF', tags: ['joker', 'white'] },
];

export default POKER_DECK;