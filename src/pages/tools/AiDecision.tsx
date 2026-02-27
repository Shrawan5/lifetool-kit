import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";

const GUIDE_QUESTIONS = [
  "What's the best possible outcome?",
  "What's the worst that could happen?",
  "What would you advise a friend in this situation?",
  "What will you regret NOT doing in 5 years?",
  "What does your gut feeling say?",
];

export default function AiDecision() {
  const [dilemma, setDilemma] = useState("");
  const [step, setStep] = useState(0); // 0=input, 1..5=questions, 6=result
  const [answers, setAnswers] = useState<string[]>(new Array(5).fill(""));

  const update = (v: string) => { const a = [...answers]; a[step - 1] = v; setAnswers(a); };

  const filledCount = answers.filter((a) => a.trim().length > 10).length;
  const clarityScore = Math.round((filledCount / 5) * 100);
  const recommendation = clarityScore >= 80 ? "You have strong clarity — trust your analysis and act." : clarityScore >= 50 ? "You're getting clearer. Revisit the weaker areas before deciding." : "More reflection needed. Take time with the questions you skipped.";

  return (
    <ToolLayout title="AI Decision Clarity" description="AI-powered decision helper" icon={Sparkles}>
      {step === 0 && (
        <div>
          <label className="text-sm font-medium mb-2 block">What decision are you facing?</label>
          <Textarea value={dilemma} onChange={(e) => setDilemma(e.target.value)} rows={3} placeholder="Describe your dilemma..." />
          <Button className="w-full mt-4" disabled={!dilemma.trim()} onClick={() => setStep(1)}>Start Analysis</Button>
        </div>
      )}

      {step >= 1 && step <= 5 && (
        <div>
          <p className="text-xs text-muted-foreground mb-1">Question {step}/5</p>
          <p className="text-sm bg-secondary rounded-md p-2 mb-3 text-muted-foreground italic">"{dilemma}"</p>
          <p className="font-medium mb-3">{GUIDE_QUESTIONS[step - 1]}</p>
          <Textarea value={answers[step - 1]} onChange={(e) => update(e.target.value)} rows={3} placeholder="Your thoughts..." />
          <div className="flex gap-2 mt-4">
            {step > 1 && <Button variant="outline" onClick={() => setStep(step - 1)}>Back</Button>}
            <Button className="flex-1" onClick={() => setStep(step + 1)}>{step === 5 ? "See Results" : "Next"}</Button>
          </div>
        </div>
      )}

      {step === 6 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Decision Clarity Score</p>
          <p className="text-5xl font-bold text-primary mb-2">{clarityScore}%</p>
          <Progress value={clarityScore} className="mb-4" />
          <p className="text-sm text-muted-foreground mb-6">{recommendation}</p>
          <Button variant="outline" onClick={() => { setStep(0); setDilemma(""); setAnswers(new Array(5).fill("")); }}>Start Over</Button>
        </div>
      )}
    </ToolLayout>
  );
}
