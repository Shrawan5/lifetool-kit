import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const QUESTIONS = [
  "What would you do if money were no object?",
  "What are you most proud of in your life so far?",
  "What do people most often come to you for help with?",
  "Describe your ideal average day five years from now.",
  "What's one thing you've always wanted to learn or try?",
  "What values are non-negotiable in your life?",
  "If you could solve one problem in the world, what would it be?",
  "What activities make you lose track of time?",
];

export default function LifeDirection() {
  const [answers, setAnswers] = useState<string[]>(new Array(QUESTIONS.length).fill(""));
  const [showSummary, setShowSummary] = useState(false);

  const update = (i: number, v: string) => { const a = [...answers]; a[i] = v; setAnswers(a); };

  return (
    <ToolLayout title="Life Direction Quiz" description="Deep reflective questions" icon={Compass}>
      {!showSummary ? (
        <>
          <div className="space-y-6">
            {QUESTIONS.map((q, i) => (
              <div key={i}>
                <label className="text-sm font-medium mb-1 block">{i + 1}. {q}</label>
                <Textarea value={answers[i]} onChange={(e) => update(i, e.target.value)} rows={3} placeholder="Your thoughts..." />
              </div>
            ))}
          </div>
          <Button className="w-full mt-6" onClick={() => setShowSummary(true)}>View Summary</Button>
        </>
      ) : (
        <>
          <h3 className="font-semibold mb-4">Your Reflections</h3>
          <div className="space-y-4">
            {QUESTIONS.map((q, i) => (
              <div key={i} className="rounded-md bg-secondary p-3">
                <p className="text-xs text-muted-foreground mb-1">{q}</p>
                <p className="text-sm">{answers[i] || <span className="italic text-muted-foreground">Not answered</span>}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={() => setShowSummary(false)}>Edit Answers</Button>
        </>
      )}
    </ToolLayout>
  );
}
