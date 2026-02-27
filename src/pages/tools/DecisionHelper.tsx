import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Scale, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

interface Item { text: string; weight: number }

export default function DecisionHelper() {
  const [question, setQuestion] = useState("");
  const [pros, setPros] = useState<Item[]>([{ text: "", weight: 5 }]);
  const [cons, setCons] = useState<Item[]>([{ text: "", weight: 5 }]);

  const addItem = (side: "pro" | "con") => {
    if (side === "pro") setPros([...pros, { text: "", weight: 5 }]);
    else setCons([...cons, { text: "", weight: 5 }]);
  };

  const removeItem = (side: "pro" | "con", i: number) => {
    if (side === "pro") setPros(pros.filter((_, idx) => idx !== i));
    else setCons(cons.filter((_, idx) => idx !== i));
  };

  const updateItem = (side: "pro" | "con", i: number, field: "text" | "weight", val: string | number) => {
    const update = (items: Item[]) => items.map((item, idx) => idx === i ? { ...item, [field]: val } : item);
    if (side === "pro") setPros(update(pros));
    else setCons(update(cons));
  };

  const proScore = pros.filter(p => p.text).reduce((sum, p) => sum + p.weight, 0);
  const conScore = cons.filter(c => c.text).reduce((sum, c) => sum + c.weight, 0);
  const total = proScore + conScore || 1;

  return (
    <ToolLayout title="Decision Helper" description="Weighted pros & cons calculator" icon={Scale}>
      <div className="space-y-5">
        <Input placeholder="What are you deciding?" value={question} onChange={(e) => setQuestion(e.target.value)} className="bg-secondary border-border" />

        <div className="grid gap-4 sm:grid-cols-2">
          <Section title="Pros ✓" items={pros} side="pro" onAdd={() => addItem("pro")} onRemove={(i) => removeItem("pro", i)} onUpdate={(i, f, v) => updateItem("pro", i, f, v)} color="text-primary" />
          <Section title="Cons ✗" items={cons} side="con" onAdd={() => addItem("con")} onRemove={(i) => removeItem("con", i)} onUpdate={(i, f, v) => updateItem("con", i, f, v)} color="text-destructive" />
        </div>

        <div className="rounded-md bg-secondary p-4">
          <div className="mb-2 flex justify-between text-xs text-muted-foreground">
            <span>Pros: {proScore}</span>
            <span>Cons: {conScore}</span>
          </div>
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
            <div className="bg-primary transition-all" style={{ width: `${(proScore / total) * 100}%` }} />
            <div className="bg-destructive transition-all" style={{ width: `${(conScore / total) * 100}%` }} />
          </div>
          <p className="mt-2 text-center text-sm font-semibold text-foreground">
            {proScore > conScore ? "Leaning towards: Yes ✓" : proScore < conScore ? "Leaning towards: No ✗" : "It's a tie!"}
          </p>
        </div>
      </div>
    </ToolLayout>
  );
}

function Section({ title, items, side, onAdd, onRemove, onUpdate, color }: {
  title: string; items: Item[]; side: "pro" | "con";
  onAdd: () => void; onRemove: (i: number) => void;
  onUpdate: (i: number, f: "text" | "weight", v: string | number) => void;
  color: string;
}) {
  return (
    <div>
      <h3 className={`mb-2 text-sm font-semibold ${color}`}>{title}</h3>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="space-y-1">
            <div className="flex gap-1">
              <Input placeholder="Add point..." value={item.text} onChange={(e) => onUpdate(i, "text", e.target.value)} className="bg-muted border-border text-xs h-8" />
              {items.length > 1 && (
                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => onRemove(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-muted-foreground w-14">Weight: {item.weight}</span>
              <Slider value={[item.weight]} onValueChange={([v]) => onUpdate(i, "weight", v)} min={1} max={10} step={1} className="flex-1" />
            </div>
          </div>
        ))}
        <Button variant="ghost" size="sm" className="w-full text-xs" onClick={onAdd}>
          <Plus className="mr-1 h-3 w-3" /> Add
        </Button>
      </div>
    </div>
  );
}
