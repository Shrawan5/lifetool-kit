import { useState, useEffect } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Sub { id: string; name: string; cost: number; date: string; }

const KEY = "lifekit-subs";
const load = (): Sub[] => { try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; } };

export default function LifeAdmin() {
  const [subs, setSubs] = useState(load);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(subs)); }, [subs]);

  const add = () => {
    if (!name.trim() || !cost || !date) return;
    setSubs([...subs, { id: Date.now().toString(), name: name.trim(), cost: parseFloat(cost), date }]);
    setName(""); setCost(""); setDate("");
  };

  const sorted = [...subs].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const total = subs.reduce((s, x) => s + x.cost, 0);

  return (
    <ToolLayout title="Life Admin Organizer" description="Subscriptions & renewal reminders" icon={CreditCard}>
      <div className="grid grid-cols-3 gap-2 mb-4">
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="number" placeholder="Cost/mo" value={cost} onChange={(e) => setCost(e.target.value)} />
        <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <Button onClick={add} className="w-full mb-6"><Plus className="h-4 w-4 mr-2" />Add Subscription</Button>

      <div className="mb-4 flex justify-between text-sm">
        <span className="text-muted-foreground">{subs.length} subscriptions</span>
        <span className="font-semibold">${total.toFixed(2)}/mo total</span>
      </div>

      <div className="space-y-2">
        {sorted.length === 0 && <p className="text-center text-muted-foreground py-8">No subscriptions yet.</p>}
        {sorted.map((s) => (
          <div key={s.id} className="flex items-center justify-between rounded-md border border-border p-3">
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-muted-foreground">Renews: {s.date}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold">${s.cost.toFixed(2)}</span>
              <Button variant="ghost" size="icon" onClick={() => setSubs(subs.filter((x) => x.id !== s.id))}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
