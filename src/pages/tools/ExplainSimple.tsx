import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { MessageCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

const TOPICS: Record<string, string> = {
  "blockchain": "Imagine a notebook that everyone can read but nobody can erase. Every time someone writes something, everyone gets a copy. That's blockchain — a shared record that can't be cheated.",
  "artificial intelligence": "AI is like teaching a computer to learn from examples, the way you learn from experience. Show it 1000 cats and it figures out what a cat looks like.",
  "quantum computing": "Normal computers use bits (0 or 1). Quantum computers use qubits that can be 0 AND 1 at the same time, like a coin spinning in the air before it lands.",
  "machine learning": "Instead of telling a computer exactly what to do, you give it lots of examples and let it figure out the pattern — like learning to ride a bike by practice, not instructions.",
  "cryptocurrency": "Digital money that works without a bank. Instead of a bank keeping track of who has what, everyone's computers work together to keep the records honest.",
  "climate change": "Earth is wrapped in a blanket of gases. We're making the blanket thicker by burning fossil fuels, so the planet gets warmer — like wearing a winter coat in summer.",
  "dna": "DNA is like an instruction manual inside every cell of your body. It tells your cells how to build you — your eye color, height, and everything else.",
  "relativity": "Einstein figured out that time isn't the same for everyone. If you travel super fast, time slows down for you compared to someone standing still.",
  "inflation": "When there's more money floating around but the same amount of stuff to buy, prices go up. Your dollar buys less — that's inflation.",
  "stock market": "A stock market is like a huge marketplace where people buy and sell tiny pieces of companies. If the company does well, your piece becomes worth more.",
  "photosynthesis": "Plants eat sunlight. They take sunlight, water, and CO2 from the air and turn it into food (sugar) and release oxygen for us to breathe.",
  "gravity": "Everything with mass pulls on everything else. The bigger you are, the stronger you pull. Earth is really big, so it pulls you down — that's why you don't float away.",
  "evolution": "Living things change slowly over millions of years. The ones best suited to their environment survive and have babies, passing on helpful traits.",
  "internet": "The internet is millions of computers connected by wires and signals, sharing information. When you open a website, you're asking a computer far away to send you a page.",
  "vaccines": "Vaccines are like a training exercise for your immune system. They show your body a harmless version of a germ so it knows how to fight the real thing later.",
  "black holes": "When a massive star dies, it can collapse into a point so dense that nothing — not even light — can escape its gravity. That's a black hole.",
  "supply and demand": "If everyone wants something but there's not much of it, the price goes up. If nobody wants it, the price drops. That's supply and demand.",
  "democracy": "A system where people get to choose their leaders by voting. The idea is that everyone has a say in how things are run.",
  "algorithms": "A set of step-by-step instructions to solve a problem — like a recipe. Computers follow algorithms to do everything from sorting your photos to suggesting videos.",
  "compound interest": "Interest on your interest. If you save $100 and earn 10%, next year you earn interest on $110 instead of $100. It snowballs over time.",
  "neural networks": "Computer systems inspired by the brain. They have layers of connected nodes that learn patterns from data, getting better with more examples.",
  "gdp": "GDP measures how much stuff a country makes and sells in a year. It's like a scorecard for a country's economy.",
  "carbon footprint": "The total amount of greenhouse gases you produce through your daily activities — driving, eating, using electricity. Smaller footprint = better for the planet.",
  "encryption": "Scrambling a message so only the right person can read it. Like writing in a secret code that only your friend knows how to decode.",
  "renewable energy": "Energy from sources that don't run out — sunlight, wind, water. Unlike oil or coal, the sun keeps shining and the wind keeps blowing.",
};

export default function ExplainSimple() {
  const [query, setQuery] = useState("");
  const keys = Object.keys(TOPICS);
  const match = keys.find((k) => k.toLowerCase().includes(query.toLowerCase().trim()));
  const filtered = query.trim() ? keys.filter((k) => k.toLowerCase().includes(query.toLowerCase().trim())) : keys;

  return (
    <ToolLayout title="Explain Like I'm 12" description="Simplify complex topics" icon={MessageCircle}>
      <Input placeholder="Search a topic (e.g., blockchain, DNA)..." value={query} onChange={(e) => setQuery(e.target.value)} className="mb-6" />

      {match && query.trim() ? (
        <div className="rounded-lg bg-secondary p-6">
          <h3 className="font-bold capitalize text-lg mb-2">{match}</h3>
          <p className="text-muted-foreground leading-relaxed">{TOPICS[match]}</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-[350px] overflow-y-auto">
          {filtered.map((k) => (
            <button key={k} onClick={() => setQuery(k)} className="w-full text-left rounded-md border border-border p-3 hover:border-primary/30 transition-colors capitalize">
              {k}
            </button>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
