import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUESTIONS = [
  { q: "What's your primary skill?", opts: ["Writing", "Design", "Coding", "Teaching", "Marketing", "Photography"] },
  { q: "How much time can you invest weekly?", opts: ["1-5 hrs", "5-10 hrs", "10-20 hrs", "20+ hrs"] },
  { q: "Preferred work style?", opts: ["Solo", "Team", "Flexible"] },
  { q: "Initial investment comfort?", opts: ["$0", "Under $100", "Under $500", "$500+"] },
];

const IDEAS: Record<string, string[]> = {
  Writing: ["Freelance blog writing", "Copywriting agency", "Self-publish e-books", "Newsletter business", "Resume writing service"],
  Design: ["Logo design service", "Social media templates", "UI/UX consulting", "Print-on-demand store", "Brand identity packages"],
  Coding: ["Build WordPress plugins", "SaaS micro-product", "Freelance web dev", "Mobile app development", "API integrations consulting"],
  Teaching: ["Online tutoring", "Create online courses", "YouTube education channel", "Workshop hosting", "Language lessons"],
  Marketing: ["Social media management", "SEO consulting", "Email marketing agency", "Affiliate marketing", "Influencer management"],
  Photography: ["Stock photography", "Event photography", "Photo editing service", "Photography courses", "Product photography"],
};

export default function SideHustle() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const answer = (opt: string) => {
    const next = [...answers, opt];
    setAnswers(next);
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      const skill = next[0];
      setResults(IDEAS[skill] || ["Freelance consulting", "Create digital products", "Start a YouTube channel"]);
    }
  };

  const reset = () => { setStep(0); setAnswers([]); setResults([]); };

  return (
    <ToolLayout title="Side Hustle Ideas" description="AI-powered idea generator" icon={Lightbulb}>
      {results.length === 0 ? (
        <div className="text-center">
          <p className="text-xs text-muted-foreground mb-4">Question {step + 1}/{QUESTIONS.length}</p>
          <p className="text-lg font-semibold mb-6">{QUESTIONS[step].q}</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {QUESTIONS[step].opts.map((opt) => (
              <Button key={opt} variant="outline" onClick={() => answer(opt)}>{opt}</Button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-semibold mb-4 text-center">💡 Your Top Ideas</h3>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="rounded-md border border-border p-3 flex items-center gap-3">
                <span className="text-primary font-bold">{i + 1}</span>
                <span>{r}</span>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4" onClick={reset}>Start Over</Button>
        </div>
      )}
    </ToolLayout>
  );
}
