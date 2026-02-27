import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Target, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Goal {
  id: string;
  text: string;
  done: boolean;
}

const STORAGE_KEY = "lifekit-goals";

function loadGoals(): { daily: Goal[]; weekly: Goal[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { daily: [], weekly: [] };
}

export default function GoalTracker() {
  const [goals, setGoals] = useState(loadGoals);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("daily");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
  }, [goals]);

  const add = () => {
    if (!input.trim()) return;
    const g: Goal = { id: Date.now().toString(), text: input.trim(), done: false };
    setGoals((prev) => ({ ...prev, [tab]: [...prev[tab as "daily" | "weekly"], g] }));
    setInput("");
  };

  const toggle = (id: string) => {
    setGoals((prev) => ({
      ...prev,
      [tab]: prev[tab as "daily" | "weekly"].map((g) => (g.id === id ? { ...g, done: !g.done } : g)),
    }));
  };

  const remove = (id: string) => {
    setGoals((prev) => ({
      ...prev,
      [tab]: prev[tab as "daily" | "weekly"].filter((g) => g.id !== id),
    }));
  };

  const list = goals[tab as "daily" | "weekly"];
  const pct = list.length ? Math.round((list.filter((g) => g.done).length / list.length) * 100) : 0;

  return (
    <ToolLayout title="Goal Tracker" description="Track daily & weekly goals without signup" icon={Target}>
      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="mb-4 w-full">
          <TabsTrigger value="daily" className="flex-1">Daily</TabsTrigger>
          <TabsTrigger value="weekly" className="flex-1">Weekly</TabsTrigger>
        </TabsList>

        <div className="mb-4 flex gap-2">
          <Input placeholder="Add a goal..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
          <Button size="icon" onClick={add}><Plus className="h-4 w-4" /></Button>
        </div>

        <div className="mb-4">
          <div className="mb-1 flex justify-between text-sm text-muted-foreground">
            <span>Progress</span><span>{pct}%</span>
          </div>
          <Progress value={pct} />
        </div>

        {["daily", "weekly"].map((t) => (
          <TabsContent key={t} value={t} className="space-y-2">
            {goals[t as "daily" | "weekly"].length === 0 && <p className="text-center text-sm text-muted-foreground py-8">No goals yet. Add one above!</p>}
            {goals[t as "daily" | "weekly"].map((g) => (
              <div key={g.id} className="flex items-center gap-3 rounded-md border border-border p-3">
                <Checkbox checked={g.done} onCheckedChange={() => toggle(g.id)} />
                <span className={`flex-1 ${g.done ? "line-through text-muted-foreground" : ""}`}>{g.text}</span>
                <Button variant="ghost" size="icon" onClick={() => remove(g.id)}><Trash2 className="h-4 w-4" /></Button>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </ToolLayout>
  );
}
