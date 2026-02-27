import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Award } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";

const CATEGORIES = [
  { key: "online", label: "Online Presence", desc: "Website, LinkedIn, social profiles" },
  { key: "portfolio", label: "Portfolio Quality", desc: "Case studies, project examples" },
  { key: "networking", label: "Networking", desc: "Industry connections, events" },
  { key: "testimonials", label: "Testimonials", desc: "Client reviews, recommendations" },
  { key: "content", label: "Content Creation", desc: "Blog posts, videos, talks" },
  { key: "niche", label: "Niche Expertise", desc: "Specialization and authority" },
  { key: "consistency", label: "Visual Consistency", desc: "Brand colors, logos, style" },
  { key: "communication", label: "Communication", desc: "Response time, professionalism" },
];

export default function BrandScore() {
  const [scores, setScores] = useState<Record<string, number>>(
    Object.fromEntries(CATEGORIES.map((c) => [c.key, 5]))
  );

  const total = Object.values(scores).reduce((s, v) => s + v, 0);
  const maxTotal = CATEGORIES.length * 10;
  const pct = Math.round((total / maxTotal) * 100);
  const grade = pct >= 80 ? "A" : pct >= 60 ? "B" : pct >= 40 ? "C" : "D";

  return (
    <ToolLayout title="Brand Score Calc" description="Freelancer personal brand score" icon={Award}>
      <div className="space-y-5">
        {CATEGORIES.map((cat) => (
          <div key={cat.key}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{cat.label}</span>
              <span className="text-muted-foreground">{scores[cat.key]}/10</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{cat.desc}</p>
            <Slider
              value={[scores[cat.key]]}
              onValueChange={([v]) => setScores({ ...scores, [cat.key]: v })}
              max={10} step={1}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg bg-secondary p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">Your Brand Score</p>
        <p className="text-5xl font-bold text-primary">{grade}</p>
        <Progress value={pct} className="mt-3" />
        <p className="text-xs text-muted-foreground mt-2">{total}/{maxTotal} points ({pct}%)</p>
      </div>
    </ToolLayout>
  );
}
