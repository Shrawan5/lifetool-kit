import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InflationCalc() {
  const [amount, setAmount] = useState("1000");
  const [startYear, setStartYear] = useState("2000");
  const [endYear, setEndYear] = useState("2025");
  const [rate, setRate] = useState("3.5");

  const years = (parseInt(endYear) || 0) - (parseInt(startYear) || 0);
  const inflationRate = (parseFloat(rate) || 0) / 100;
  const adjusted = years > 0 ? (parseFloat(amount) || 0) * Math.pow(1 + inflationRate, years) : parseFloat(amount) || 0;
  const lostPower = adjusted - (parseFloat(amount) || 0);

  return (
    <ToolLayout title="Inflation Calculator" description="See how prices change over time" icon={TrendingUp}>
      <div className="space-y-4">
        <div><Label>Amount ($)</Label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Start Year</Label><Input type="number" value={startYear} onChange={(e) => setStartYear(e.target.value)} /></div>
          <div><Label>End Year</Label><Input type="number" value={endYear} onChange={(e) => setEndYear(e.target.value)} /></div>
        </div>
        <div><Label>Avg. Annual Inflation Rate (%)</Label><Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} /></div>
      </div>

      <div className="mt-6 rounded-lg bg-secondary p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">${parseFloat(amount).toLocaleString()} in {startYear} equals</p>
        <p className="text-4xl font-bold text-primary">${adjusted.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground mt-1">in {endYear} ({years} years)</p>
        <p className="text-xs text-destructive mt-2">Purchasing power lost: ${lostPower.toFixed(2)}</p>
      </div>
    </ToolLayout>
  );
}
