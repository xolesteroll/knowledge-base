'use client'

import { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover'
import { Button } from '../../ui/button'
import { ScrollArea } from '../../ui/scroll-area'
import POKER_DECK from '../data/poker-deck'



interface PokerDeckPickerProps {
  onCardSelect: (cardName: string) => void
}

export function PokerDeckPicker({ onCardSelect }: PokerDeckPickerProps) {
  const [open, setOpen] = useState(false)

  const handleCardClick = (cardName: string) => {
    onCardSelect(cardName)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-auto px-2">
          🂡 Cards
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-2" align="start">
        <div className="mb-2 text-sm font-medium text-muted-foreground">
          Poker Deck (54 cards)
        </div>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {/* Spades */}
            <div>
              <div className="text-xs font-semibold mb-1 text-muted-foreground">♠ Spades</div>
              <div className="grid grid-cols-13 gap-1">
                {POKER_DECK.slice(0, 13).map((card) => (
                  <button
                    key={card.name}
                    onClick={() => handleCardClick(card.name)}
                    className="flex items-center justify-center w-7 h-10 text-xl hover:bg-accent rounded transition-colors border border-border"
                    title={card.name}
                    type="button"
                  >
                    {card.emoji}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Hearts */}
            <div>
              <div className="text-xs font-semibold mb-1 text-muted-foreground">♥ Hearts</div>
              <div className="grid grid-cols-13 gap-1">
                {POKER_DECK.slice(13, 26).map((card) => (
                  <button
                    key={card.name}
                    onClick={() => handleCardClick(card.name)}
                    className="flex items-center justify-center w-7 h-10 text-xl hover:bg-accent rounded transition-colors border border-border"
                    title={card.name}
                    type="button"
                  >
                    {card.emoji}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Diamonds */}
            <div>
              <div className="text-xs font-semibold mb-1 text-muted-foreground">♦ Diamonds</div>
              <div className="grid grid-cols-13 gap-1">
                {POKER_DECK.slice(26, 39).map((card) => (
                  <button
                    key={card.name}
                    onClick={() => handleCardClick(card.name)}
                    className="flex items-center justify-center w-7 h-10 text-xl hover:bg-accent rounded transition-colors border border-border"
                    title={card.name}
                    type="button"
                  >
                    {card.emoji}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Clubs */}
            <div>
              <div className="text-xs font-semibold mb-1 text-muted-foreground">♣ Clubs</div>
              <div className="grid grid-cols-13 gap-1">
                {POKER_DECK.slice(39, 52).map((card) => (
                  <button
                    key={card.name}
                    onClick={() => handleCardClick(card.name)}
                    className="flex items-center justify-center w-7 h-10 text-xl hover:bg-accent rounded transition-colors border border-border"
                    title={card.name}
                    type="button"
                  >
                    {card.emoji}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Jokers */}
            <div>
              <div className="text-xs font-semibold mb-1 text-muted-foreground">🃏 Jokers</div>
              <div className="flex gap-1">
                {POKER_DECK.slice(52, 54).map((card) => (
                  <button
                    key={card.name}
                    onClick={() => handleCardClick(card.name)}
                    className="flex items-center justify-center w-7 h-10 text-xl hover:bg-accent rounded transition-colors border border-border"
                    title={card.name}
                    type="button"
                  >
                    {card.emoji}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}
