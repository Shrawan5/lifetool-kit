import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const QUESTIONS = [
  "I feel overwhelmed by my responsibilities.",
  "I have trouble sleeping due to worry.",
  "I feel irritable or short-tempered.",
  "I have difficulty concentrating.",
  "I feel physically tense or have headaches.",
  "I feel anxious about the future.",
  "I struggle to relax even when I have time.",
  "I feel disconnected from people around me.",
  "I experience changes in appetite.",
  "I feel like I have too little control over my life.",
];

const OPTIONS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

export default function StressCheck() {
  const [answers, setAnswers] = useState<number[]>(new Array(QUESTIONS.length).fill(-1));
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = answers.every((a) => a >= 0);
  const score = answers.reduce((s, a) => s + Math.max(a, 0), 0);
  const maxScore = QUESTIONS.length * 4;
  const pct = Math.round((score / maxScore) * 100);

  const level = pct <= 25 ? "Low" : pct <= 50 ? "Moderate" : pct <= 75 ? "High" : "Very High";
  const advice = pct <= 25 ? "You're managing stress well! Keep up healthy habits." : pct <= 50 ? "Some stress present. Consider adding relaxation techniques." : pct <= 75 ? "Significant stress detected. Prioritize self-care and consider talking to someone." : "Very high stress. Please consider reaching out to a mental health professional.";

  return (
    <ToolLayout title="Stress Self-Check" description="Quick stress questionnaire" icon={Heart}>
      {!submitted ? (
        <>
          <div className="space-y-6">
            {QUESTIONS.map((q, qi) => (
              <div key={qi}>
                <p className="text-sm font-medium mb-2">{qi + 1}. {q}</p>
                <div className="flex gap-2 flex-wrap">
                  {OPTIONS.map((opt, oi) => (
                    <button
                      key={oi}
                      onClick={() => { const a = [...answers]; a[qi] = oi; setAnswers(a); }}
                      className={`rounded-md px-3 py-1.5 text-xs border transition-colors ${answers[qi] === oi ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-6" disabled={!allAnswered} onClick={() => setSubmitted(true)}>Get Results</Button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-2">Your Stress Level</p>
          <p className="text-4xl font-bold text-primary mb-2">{level}</p>
          <Progress value={pct} className="mb-4" />
          <p className="text-sm text-muted-foreground mb-6">{advice}</p>
          <Button variant="outline" onClick={() => { setAnswers(new Array(QUESTIONS.length).fill(-1)); setSubmitted(false); }}>Retake</Button>
        </div>
      )}
    </ToolLayout>
  );
}
