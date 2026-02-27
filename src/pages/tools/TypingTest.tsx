import { useState, useEffect, useRef, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";

const sentences = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Pack my box with five dozen liquor jugs for the evening party.",
  "A journey of a thousand miles begins with a single brave step.",
  "Creativity is intelligence having fun with new ideas every day.",
  "Success is not final and failure is not fatal keep going forward.",
];

export default function TypingTest() {
  const [text] = useState(() => sentences[Math.floor(Math.random() * sentences.length)]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = useCallback((val: string) => {
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setInput(val);
    // Calculate accuracy
    let correct = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] === text[i]) correct++;
    }
    setAccuracy(val.length > 0 ? Math.round((correct / val.length) * 100) : 100);

    if (val.length >= text.length) {
      const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
      const words = text.split(" ").length;
      setWpm(Math.round(words / (elapsed || 1)));
      setFinished(true);
    }
  }, [started, startTime, text]);

  const reset = () => {
    setInput("");
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (started && !finished) {
      const timer = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000 / 60;
        const words = input.split(" ").filter(Boolean).length;
        setWpm(Math.round(words / (elapsed || 1)));
      }, 500);
      return () => clearInterval(timer);
    }
  }, [started, finished, startTime, input]);

  return (
    <ToolLayout title="Typing Speed Test" description="Test your typing speed" icon={Keyboard}>
      <div className="space-y-4">
        <div className="rounded-md bg-secondary p-4 font-mono text-sm leading-relaxed">
          {text.split("").map((char, i) => {
            let cls = "text-muted-foreground";
            if (i < input.length) {
              cls = input[i] === char ? "text-primary" : "text-destructive underline";
            }
            return <span key={i} className={cls}>{char}</span>;
          })}
        </div>

        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => !finished && handleInput(e.target.value)}
          placeholder="Start typing here..."
          className="w-full resize-none rounded-md border border-border bg-muted p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          rows={3}
          disabled={finished}
          autoFocus
        />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-secondary p-3 text-center">
            <p className="text-xs text-muted-foreground">WPM</p>
            <p className="text-2xl font-bold text-primary">{wpm}</p>
          </div>
          <div className="rounded-md bg-secondary p-3 text-center">
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
          </div>
        </div>

        {finished && (
          <Button onClick={reset} className="w-full">Try Again</Button>
        )}
      </div>
    </ToolLayout>
  );
}
