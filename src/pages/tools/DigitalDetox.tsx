import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUOTES = [
  "Almost everything will work again if you unplug it for a few minutes — including you.",
  "Disconnect to reconnect with yourself.",
  "Your mind is a garden, your thoughts are the seeds.",
  "Be where your feet are.",
  "The greatest weapon against stress is our ability to choose one thought over another.",
  "Rest is not idleness.",
];

const PRESETS = [15, 30, 60];
const KEY = "lifekit-detox-history";

export default function DigitalDetox() {
  const [duration, setDuration] = useState(15);
  const [remaining, setRemaining] = useState(0);
  const [active, setActive] = useState(false);
  const [history, setHistory] = useState<{ date: string; mins: number }[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(history)); }, [history]);

  useEffect(() => {
    if (!active || remaining <= 0) {
      if (active && remaining <= 0) {
        setActive(false);
        setHistory((h) => [...h, { date: new Date().toLocaleDateString(), mins: duration }]);
      }
      return;
    }
    const t = setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => clearInterval(t);
  }, [active, remaining, duration]);

  const start = (mins: number) => { setDuration(mins); setRemaining(mins * 60); setActive(true); };
  const stop = () => { setActive(false); setRemaining(0); };

  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  const quote = QUOTES[Math.floor(Date.now() / 60000) % QUOTES.length];

  return (
    <ToolLayout title="Digital Detox Timer" description="Take a break from screens" icon={Timer}>
      {!active ? (
        <>
          <p className="text-center text-sm text-muted-foreground mb-6 italic">"{quote}"</p>
          <div className="flex gap-3 mb-6">
            {PRESETS.map((p) => (
              <Button key={p} onClick={() => start(p)} className="flex-1">{p} min</Button>
            ))}
          </div>

          {history.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Session History</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {[...history].reverse().map((h, i) => (
                  <div key={i} className="flex justify-between text-sm text-muted-foreground border-b border-border py-1">
                    <span>{h.date}</span><span>{h.mins} min</span>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="mt-2" onClick={() => setHistory([])}>Clear History</Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center">
          <p className="text-6xl font-bold font-mono text-primary mb-4">
            {min.toString().padStart(2, "0")}:{sec.toString().padStart(2, "0")}
          </p>
          <p className="text-sm text-muted-foreground mb-6 italic">"{quote}"</p>
          <Button variant="destructive" onClick={stop}>End Early</Button>
        </div>
      )}
    </ToolLayout>
  );
}
