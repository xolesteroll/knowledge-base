'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { ScrollArea } from '../../ui/scroll-area'

// 100 most popular emojis organized by category
const POPULAR_EMOJIS = [
  // Smileys & Emotion
  { emoji: '😀', name: 'grinning' },
  { emoji: '😃', name: 'smiley' },
  { emoji: '😄', name: 'smile' },
  { emoji: '😁', name: 'grin' },
  { emoji: '😆', name: 'laughing' },
  { emoji: '😅', name: 'sweat_smile' },
  { emoji: '🤣', name: 'rofl' },
  { emoji: '😂', name: 'joy' },
  { emoji: '🙂', name: 'slightly_smiling_face' },
  { emoji: '🙃', name: 'upside_down_face' },
  { emoji: '😉', name: 'wink' },
  { emoji: '😊', name: 'blush' },
  { emoji: '😇', name: 'innocent' },
  { emoji: '🥰', name: 'smiling_face_with_three_hearts' },
  { emoji: '😍', name: 'heart_eyes' },
  { emoji: '🤩', name: 'star_struck' },
  { emoji: '😘', name: 'kissing_heart' },
  { emoji: '😗', name: 'kissing' },
  { emoji: '😚', name: 'kissing_closed_eyes' },
  { emoji: '😙', name: 'kissing_smiling_eyes' },
  { emoji: '🥲', name: 'smiling_face_with_tear' },
  { emoji: '😋', name: 'yum' },
  { emoji: '😛', name: 'stuck_out_tongue' },
  { emoji: '😜', name: 'stuck_out_tongue_winking_eye' },
  { emoji: '🤪', name: 'zany_face' },
  { emoji: '😝', name: 'stuck_out_tongue_closed_eyes' },
  { emoji: '🤑', name: 'money_mouth_face' },
  { emoji: '🤗', name: 'hugs' },
  { emoji: '🤭', name: 'hand_over_mouth' },
  { emoji: '🤫', name: 'shushing_face' },
  { emoji: '🤔', name: 'thinking' },
  { emoji: '🤐', name: 'zipper_mouth_face' },
  { emoji: '🤨', name: 'raised_eyebrow' },
  { emoji: '😐', name: 'neutral_face' },
  { emoji: '😑', name: 'expressionless' },
  { emoji: '😶', name: 'no_mouth' },
  { emoji: '😏', name: 'smirk' },
  { emoji: '😒', name: 'unamused' },
  { emoji: '🙄', name: 'roll_eyes' },
  { emoji: '😬', name: 'grimacing' },
  { emoji: '🤥', name: 'lying_face' },
  { emoji: '😌', name: 'relieved' },
  { emoji: '😔', name: 'pensive' },
  { emoji: '😪', name: 'sleepy' },
  { emoji: '🤤', name: 'drooling_face' },
  { emoji: '😴', name: 'sleeping' },
  { emoji: '😷', name: 'mask' },
  { emoji: '🤒', name: 'face_with_thermometer' },
  { emoji: '🤕', name: 'face_with_head_bandage' },
  { emoji: '🤢', name: 'nauseated_face' },
  { emoji: '🤮', name: 'vomiting_face' },
  { emoji: '🤧', name: 'sneezing_face' },
  { emoji: '🥵', name: 'hot_face' },
  { emoji: '🥶', name: 'cold_face' },
  { emoji: '😵', name: 'dizzy_face' },
  { emoji: '🤯', name: 'exploding_head' },
  { emoji: '😎', name: 'sunglasses' },
  { emoji: '🤓', name: 'nerd_face' },
  { emoji: '🧐', name: 'monocle_face' },
  { emoji: '😕', name: 'confused' },
  { emoji: '😟', name: 'worried' },
  { emoji: '🙁', name: 'slightly_frowning_face' },
  { emoji: '😮', name: 'open_mouth' },
  { emoji: '😯', name: 'hushed' },
  { emoji: '😲', name: 'astonished' },
  { emoji: '😳', name: 'flushed' },
  { emoji: '🥺', name: 'pleading_face' },
  { emoji: '😦', name: 'frowning' },
  { emoji: '😧', name: 'anguished' },
  { emoji: '😨', name: 'fearful' },
  { emoji: '😰', name: 'cold_sweat' },
  { emoji: '😥', name: 'disappointed_relieved' },
  { emoji: '😢', name: 'cry' },
  { emoji: '😭', name: 'sob' },
  { emoji: '😱', name: 'scream' },
  { emoji: '😖', name: 'confounded' },
  { emoji: '😣', name: 'persevere' },
  { emoji: '😞', name: 'disappointed' },
  { emoji: '😓', name: 'sweat' },
  { emoji: '😩', name: 'weary' },
  { emoji: '😫', name: 'tired_face' },
  { emoji: '🥱', name: 'yawning_face' },
  
  // Hand gestures
  { emoji: '👍', name: 'thumbsup' },
  { emoji: '👎', name: 'thumbsdown' },
  { emoji: '👏', name: 'clap' },
  { emoji: '🙌', name: 'raised_hands' },
  { emoji: '👌', name: 'ok_hand' },
  { emoji: '✌️', name: 'v' },
  { emoji: '🤞', name: 'crossed_fingers' },
  { emoji: '🤟', name: 'love_you_gesture' },
  { emoji: '🤘', name: 'metal' },
  { emoji: '👊', name: 'fist' },
  { emoji: '✊', name: 'fist_raised' },
  { emoji: '🤝', name: 'handshake' },
  { emoji: '🙏', name: 'pray' },
  
  // Hearts & symbols
  { emoji: '❤️', name: 'heart' },
  { emoji: '💔', name: 'broken_heart' },
  { emoji: '💕', name: 'two_hearts' },
  { emoji: '💖', name: 'sparkling_heart' },
  { emoji: '✨', name: 'sparkles' },
  { emoji: '⭐', name: 'star' },
  { emoji: '🌟', name: 'star2' },
  { emoji: '🔥', name: 'fire' },
  { emoji: '⚡', name: 'zap' },
]

interface EmojiPickerProps {
  onEmojiSelect: (emojiName: string) => void
}

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [open, setOpen] = useState(false)

  const handleEmojiClick = (emojiName: string) => {
    onEmojiSelect(emojiName)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          😀
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-2" align="start">
        <ScrollArea className="h-64">
          <div className="grid grid-cols-8 gap-1">
            {POPULAR_EMOJIS.map((item) => (
              <button
                key={item.name}
                onClick={() => handleEmojiClick(item.name)}
                className="flex items-center justify-center w-8 h-8 text-xl hover:bg-accent rounded transition-colors"
                title={item.name}
                type="button"
              >
                {item.emoji}
              </button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
