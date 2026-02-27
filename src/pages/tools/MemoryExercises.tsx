import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

const EMOJIS = ["🎯", "🌟", "🎨", "🎭", "🎪", "🎬", "🎵", "🎸"];

interface Card { id: number; emoji: string; flipped: boolean; matched: boolean; }

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function createBoard(): Card[] {
  const pairs = shuffle(EMOJIS).slice(0, 8);
  return shuffle([...pairs, ...pairs].map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false })));
}

export default function MemoryExercises() {
  const [cards, setCards] = useState(createBoard);
  const [selected, setSelected] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    if (selected.length === 2) {
      const [a, b] = selected;
      setMoves((m) => m + 1);
      if (cards[a].emoji === cards[b].emoji) {
        setCards((c) => c.map((card, i) => (i === a || i === b ? { ...card, matched: true } : card)));
        setSelected([]);
      } else {
        setTimeout(() => {
          setCards((c) => c.map((card, i) => (i === a || i === b ? { ...card, flipped: false } : card)));
          setSelected([]);
        }, 800);
      }
    }
  }, [selected, cards]);

  const flip = (i: number) => {
    if (selected.length >= 2 || cards[i].flipped || cards[i].matched) return;
    setCards((c) => c.map((card, idx) => (idx === i ? { ...card, flipped: true } : card)));
    setSelected((s) => [...s, i]);
  };

  const won = cards.every((c) => c.matched);

  const reset = () => { setCards(createBoard()); setSelected([]); setMoves(0); };

  return (
    <ToolLayout title="Memory Exercises" description="Improve your memory with exercises" icon={Brain}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-muted-foreground">Moves: {moves}</span>
        <Button variant="outline" size="sm" onClick={reset}>New Game</Button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {cards.map((card, i) => (
          <button
            key={card.id}
            onClick={() => flip(i)}
            className={`aspect-square rounded-lg text-3xl flex items-center justify-center transition-all ${
              card.flipped || card.matched ? "bg-primary/20 border-primary/40" : "bg-secondary hover:bg-secondary/80"
            } border border-border`}
          >
            {card.flipped || card.matched ? card.emoji : "?"}
          </button>
        ))}
      </div>

      {won && (
        <div className="mt-4 text-center rounded-lg bg-primary/10 p-4">
          <p className="text-lg font-bold text-primary">🎉 You won in {moves} moves!</p>
          <Button onClick={reset} className="mt-2">Play Again</Button>
        </div>
      )}
    </ToolLayout>
  );
}
