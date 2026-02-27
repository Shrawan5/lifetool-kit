import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Monitor, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Entry { date: string; hours: number; }
const KEY = "lifekit-screentime";
const load = (): Entry[] => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };

export default function ScreenTime() {
  const [entries, setEntries] = useState(load);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [hours, setHours] = useState("");

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(entries)); }, [entries]);

  const add = () => {
    if (!hours || !date) return;
    setEntries((e) => [...e.filter((x) => x.date !== date), { date, hours: parseFloat(hours) }].sort((a, b) => a.date.localeCompare(b.date)));
    setHours("");
  };

  const last7 = entries.slice(-7).map((e) => ({ name: e.date.slice(5), hours: e.hours }));
  const avg = entries.length ? (entries.reduce((s, e) => s + e.hours, 0) / entries.length).toFixed(1) : "0";

  return (
    <ToolLayout title="Screen Time Tracker" description="Awareness & tracking tool" icon={Monitor}>
      <div className="flex gap-2 mb-6">
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Input type="number" placeholder="Hours" value={hours} onChange={(e) => setHours(e.target.value)} step="0.5" />
        <Button size="icon" onClick={add}><Plus className="h-4 w-4" /></Button>
      </div>

      <div className="mb-4 text-center">
        <span className="text-sm text-muted-foreground">Daily average: </span>
        <span className="font-bold text-primary">{avg} hours</span>
      </div>

      {last7.length > 0 && (
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={last7}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {entries.length === 0 && <p className="text-center text-muted-foreground text-sm py-8">Start logging your screen time above.</p>}
    </ToolLayout>
  );
}
