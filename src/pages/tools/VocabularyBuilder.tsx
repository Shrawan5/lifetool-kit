import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const WORDS = [
  { word: "Ephemeral", def: "Lasting for a very short time.", ex: "The ephemeral beauty of cherry blossoms." },
  { word: "Ubiquitous", def: "Present, appearing, or found everywhere.", ex: "Smartphones have become ubiquitous." },
  { word: "Pragmatic", def: "Dealing with things sensibly and realistically.", ex: "She took a pragmatic approach to problem-solving." },
  { word: "Eloquent", def: "Fluent or persuasive in speaking or writing.", ex: "An eloquent speech moved the audience." },
  { word: "Resilient", def: "Able to recover quickly from difficulties.", ex: "Children are remarkably resilient." },
  { word: "Ambiguous", def: "Open to more than one interpretation.", ex: "The ending of the movie was ambiguous." },
  { word: "Candid", def: "Truthful and straightforward.", ex: "She gave a candid interview about her struggles." },
  { word: "Diligent", def: "Having or showing careful and persistent effort.", ex: "A diligent student always completes their work." },
  { word: "Empirical", def: "Based on observation or experience rather than theory.", ex: "Empirical evidence supports the theory." },
  { word: "Gregarious", def: "Fond of company; sociable.", ex: "He was a gregarious host at every party." },
  { word: "Inevitable", def: "Certain to happen; unavoidable.", ex: "Change is inevitable in any organization." },
  { word: "Juxtapose", def: "Place close together for contrasting effect.", ex: "The artist juxtaposed light and dark colors." },
  { word: "Meticulous", def: "Showing great attention to detail.", ex: "She kept meticulous records of every transaction." },
  { word: "Nuance", def: "A subtle difference in meaning or expression.", ex: "The nuance of her argument was lost on most." },
  { word: "Paradox", def: "A seemingly contradictory statement that may be true.", ex: "The paradox of choice: more options, less satisfaction." },
  { word: "Quintessential", def: "Representing the most perfect example.", ex: "She is the quintessential entrepreneur." },
  { word: "Serendipity", def: "The occurrence of events by chance in a happy way.", ex: "Finding that book was pure serendipity." },
  { word: "Tenacious", def: "Tending to keep a firm hold; persistent.", ex: "Her tenacious spirit helped her succeed." },
  { word: "Verbose", def: "Using more words than needed.", ex: "His verbose emails were hard to read." },
  { word: "Zealous", def: "Having great energy or enthusiasm.", ex: "A zealous advocate for human rights." },
];

const KEY = "lifekit-vocab-learned";

export default function VocabularyBuilder() {
  const [learned, setLearned] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
  });
  const [idx, setIdx] = useState(0);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(learned)); }, [learned]);

  const word = WORDS[idx];
  const isLearned = learned.includes(word.word);

  const toggleLearned = () => {
    setLearned((l) => isLearned ? l.filter((w) => w !== word.word) : [...l, word.word]);
  };

  return (
    <ToolLayout title="Vocabulary Builder" description="Learn new words daily" icon={BookOpen}>
      <div className="text-center mb-6">
        <span className="text-xs text-muted-foreground">{learned.length}/{WORDS.length} learned</span>
      </div>

      <div className="rounded-lg bg-secondary p-6 text-center mb-4">
        <h2 className="text-3xl font-bold mb-2">{word.word}</h2>
        <p className="text-muted-foreground mb-3">{word.def}</p>
        <p className="text-sm italic text-muted-foreground">"{word.ex}"</p>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1" onClick={() => setIdx((i) => (i - 1 + WORDS.length) % WORDS.length)}>Previous</Button>
        <Button variant={isLearned ? "secondary" : "default"} className="flex-1" onClick={toggleLearned}>
          {isLearned ? "✓ Learned" : "Mark Learned"}
        </Button>
        <Button variant="outline" className="flex-1" onClick={() => setIdx((i) => (i + 1) % WORDS.length)}>Next</Button>
      </div>
    </ToolLayout>
  );
}
