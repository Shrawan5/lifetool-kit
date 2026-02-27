import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FORMATS = ["Blog post", "YouTube video", "Podcast episode", "Twitter thread", "Instagram carousel", "Short story", "Newsletter", "TikTok series", "Workshop", "Infographic"];
const TOPICS = ["productivity", "mental health", "technology trends", "personal finance", "climate change", "AI ethics", "remote work", "minimalism", "creativity", "leadership", "space exploration", "nutrition", "history", "philosophy", "entrepreneurship"];
const CONSTRAINTS = ["in under 5 minutes", "for beginners", "using only analogies", "from a contrarian perspective", "without using jargon", "as a step-by-step guide", "through storytelling", "backed by data", "for Gen Z audience", "using humor"];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

export default function RandomIdea() {
  const [idea, setIdea] = useState({ format: pick(FORMATS), topic: pick(TOPICS), constraint: pick(CONSTRAINTS) });

  const generate = () => setIdea({ format: pick(FORMATS), topic: pick(TOPICS), constraint: pick(CONSTRAINTS) });

  return (
    <ToolLayout title="Random Idea Generator" description="Spark creativity for creators" icon={Shuffle}>
      <div className="rounded-lg bg-secondary p-6 text-center mb-6">
        <p className="text-sm text-muted-foreground mb-3">Create a...</p>
        <p className="text-xl font-bold mb-2">{idea.format}</p>
        <p className="text-sm text-muted-foreground mb-1">about</p>
        <p className="text-lg font-semibold text-primary mb-2">{idea.topic}</p>
        <p className="text-sm text-muted-foreground mb-1">but</p>
        <p className="text-md font-medium">{idea.constraint}</p>
      </div>

      <Button onClick={generate} className="w-full"><Shuffle className="h-4 w-4 mr-2" />Generate New Idea</Button>
    </ToolLayout>
  );
}
