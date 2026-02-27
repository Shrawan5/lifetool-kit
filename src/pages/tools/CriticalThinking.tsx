import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Puzzle } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHALLENGES = [
  { q: "A man pushes his car to a hotel and loses his fortune. What happened?", a: "He's playing Monopoly." },
  { q: "You see a boat filled with people. It has not sunk, but when you look again you don't see a single person on the boat. Why?", a: "All the people were married (not single)." },
  { q: "A doctor and a bus driver are both in love with the same woman. The bus driver had to go on a long trip for a week. Before he left, he gave the woman seven apples. Why?", a: "An apple a day keeps the doctor away." },
  { q: "If you have me, you want to share me. If you share me, you don't have me. What am I?", a: "A secret." },
  { q: "The more you take, the more you leave behind. What are they?", a: "Footsteps." },
  { q: "What has cities, but no houses; forests, but no trees; and water, but no fish?", a: "A map." },
  { q: "I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?", a: "An echo." },
  { q: "You measure my life in hours and I serve you by expiring. I'm quick when I'm thin and slow when I'm fat. What am I?", a: "A candle." },
  { q: "If two's company and three's a crowd, what are four and five?", a: "Nine." },
  { q: "Three doctors said that Bill was their brother. Bill says he has no brothers. How is this possible?", a: "The doctors were Bill's sisters." },
  { q: "What disappears as soon as you say its name?", a: "Silence." },
  { q: "A woman shoots her husband, then holds him underwater for five minutes. Next, she hangs him. But five minutes later they go out and enjoy a wonderful dinner. How?", a: "She took a photo of him, developed it in a darkroom, and hung it to dry." },
  { q: "Is it legal for a man to marry his widow's sister?", a: "No — he's dead." },
  { q: "What gets wetter the more it dries?", a: "A towel." },
];

export default function CriticalThinking() {
  const dayIndex = Math.floor(Date.now() / 86400000) % CHALLENGES.length;
  const [showAnswer, setShowAnswer] = useState(false);
  const [idx, setIdx] = useState(dayIndex);
  const challenge = CHALLENGES[idx];

  return (
    <ToolLayout title="Critical Thinking" description="Challenge of the day" icon={Puzzle}>
      <div className="text-center mb-4">
        <span className="text-xs text-muted-foreground">Challenge #{idx + 1} of {CHALLENGES.length}</span>
      </div>

      <div className="rounded-lg bg-secondary p-6 mb-4">
        <p className="text-lg font-medium text-center">{challenge.q}</p>
      </div>

      {showAnswer && (
        <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 mb-4 text-center">
          <p className="text-primary font-medium">{challenge.a}</p>
        </div>
      )}

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => { setIdx((i) => (i - 1 + CHALLENGES.length) % CHALLENGES.length); setShowAnswer(false); }}>Previous</Button>
        <Button className="flex-1" onClick={() => setShowAnswer(!showAnswer)}>{showAnswer ? "Hide Answer" : "Reveal Answer"}</Button>
        <Button variant="outline" className="flex-1" onClick={() => { setIdx((i) => (i + 1) % CHALLENGES.length); setShowAnswer(false); }}>Next</Button>
      </div>
    </ToolLayout>
  );
}
