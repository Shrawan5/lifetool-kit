import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Calculator } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FreelancerRate() {
  const [income, setIncome] = useState("60000");
  const [expenses, setExpenses] = useState("10000");
  const [hours, setHours] = useState("40");
  const [vacation, setVacation] = useState("4");

  const totalNeeded = (parseFloat(income) || 0) + (parseFloat(expenses) || 0);
  const workingWeeks = 52 - (parseFloat(vacation) || 0);
  const weeklyHours = parseFloat(hours) || 40;
  const billableHours = workingWeeks * weeklyHours * 0.75; // 75% billable
  const rate = billableHours > 0 ? totalNeeded / billableHours : 0;

  return (
    <ToolLayout title="Freelancer Rate Calc" description="Calculate your ideal hourly rate" icon={Calculator}>
      <div className="space-y-4">
        <div><Label>Desired Annual Income ($)</Label><Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} /></div>
        <div><Label>Annual Business Expenses ($)</Label><Input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} /></div>
        <div><Label>Hours per Week</Label><Input type="number" value={hours} onChange={(e) => setHours(e.target.value)} /></div>
        <div><Label>Vacation Weeks per Year</Label><Input type="number" value={vacation} onChange={(e) => setVacation(e.target.value)} /></div>
      </div>

      <div className="mt-6 rounded-lg bg-secondary p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">Your ideal hourly rate</p>
        <p className="text-4xl font-bold text-primary">${rate.toFixed(2)}</p>
        <p className="text-xs text-muted-foreground mt-2">Based on {billableHours.toFixed(0)} billable hours/year (75% utilization)</p>
      </div>
    </ToolLayout>
  );
}
