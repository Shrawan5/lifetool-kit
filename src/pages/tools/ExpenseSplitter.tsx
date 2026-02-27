import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Split, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Expense { id: string; desc: string; amount: number; paidBy: string; }

export default function ExpenseSplitter() {
  const [people, setPeople] = useState<string[]>(["Alice", "Bob"]);
  const [newPerson, setNewPerson] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");
  const [paidBy, setPaidBy] = useState("");

  const addPerson = () => { if (newPerson.trim() && !people.includes(newPerson.trim())) { setPeople([...people, newPerson.trim()]); setNewPerson(""); } };
  const addExpense = () => {
    if (!desc.trim() || !amount || !paidBy) return;
    setExpenses([...expenses, { id: Date.now().toString(), desc: desc.trim(), amount: parseFloat(amount), paidBy }]);
    setDesc(""); setAmount("");
  };

  const total = expenses.reduce((s, e) => s + e.amount, 0);
  const perPerson = people.length ? total / people.length : 0;
  const balances = people.map((p) => {
    const paid = expenses.filter((e) => e.paidBy === p).reduce((s, e) => s + e.amount, 0);
    return { name: p, balance: paid - perPerson };
  });

  return (
    <ToolLayout title="Expense Splitter" description="Split costs for friends & trips" icon={Split}>
      <div className="flex gap-2 mb-4">
        <Input placeholder="Add person" value={newPerson} onChange={(e) => setNewPerson(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addPerson()} />
        <Button size="icon" onClick={addPerson}><Plus className="h-4 w-4" /></Button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {people.map((p) => (
          <span key={p} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
            {p}
            <button onClick={() => setPeople(people.filter((x) => x !== p))} className="text-muted-foreground hover:text-destructive">×</button>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-2">
        <Input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <select className="rounded-md border border-border bg-background px-3 text-sm" value={paidBy} onChange={(e) => setPaidBy(e.target.value)}>
          <option value="">Paid by</option>
          {people.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <Button onClick={addExpense} className="w-full mb-6"><Plus className="h-4 w-4 mr-2" />Add Expense</Button>

      {expenses.map((e) => (
        <div key={e.id} className="flex justify-between items-center border border-border rounded-md p-2 mb-2 text-sm">
          <span>{e.desc}</span>
          <span>${e.amount.toFixed(2)} by {e.paidBy}</span>
          <Button variant="ghost" size="icon" onClick={() => setExpenses(expenses.filter((x) => x.id !== e.id))}><Trash2 className="h-3 w-3" /></Button>
        </div>
      ))}

      {expenses.length > 0 && (
        <div className="mt-4 rounded-lg bg-secondary p-4">
          <p className="text-sm text-muted-foreground mb-2">Each person owes: ${perPerson.toFixed(2)}</p>
          {balances.map((b) => (
            <div key={b.name} className="flex justify-between text-sm py-1">
              <span>{b.name}</span>
              <span className={b.balance >= 0 ? "text-primary" : "text-destructive"}>
                {b.balance >= 0 ? `gets back $${b.balance.toFixed(2)}` : `owes $${Math.abs(b.balance).toFixed(2)}`}
              </span>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
