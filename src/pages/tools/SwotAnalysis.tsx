import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const QUADRANTS = [
  { key: "strengths", label: "Strengths", color: "text-primary" },
  { key: "weaknesses", label: "Weaknesses", color: "text-destructive" },
  { key: "opportunities", label: "Opportunities", color: "text-accent-foreground" },
  { key: "threats", label: "Threats", color: "text-muted-foreground" },
] as const;

export default function SwotAnalysis() {
  const [data, setData] = useState({ strengths: "", weaknesses: "", opportunities: "", threats: "" });
  const { toast } = useToast();

  const exportText = () => {
    const text = QUADRANTS.map((q) => `## ${q.label}\n${data[q.key] || "(empty)"}`).join("\n\n");
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <ToolLayout title="SWOT Analysis" description="Personal strengths & weaknesses" icon={User}>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {QUADRANTS.map((q) => (
          <div key={q.key}>
            <label className={`text-sm font-semibold ${q.color} mb-1 block`}>{q.label}</label>
            <Textarea
              placeholder={`Enter ${q.label.toLowerCase()}...`}
              value={data[q.key]}
              onChange={(e) => setData({ ...data, [q.key]: e.target.value })}
              rows={5}
            />
          </div>
        ))}
      </div>
      <Button onClick={exportText} className="w-full">Copy as Text</Button>
    </ToolLayout>
  );
}
