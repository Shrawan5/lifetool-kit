import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { TrendingUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CITIES: Record<string, { rent: number; food: number; transport: number; utilities: number }> = {
  "New York": { rent: 100, food: 100, transport: 100, utilities: 100 },
  "San Francisco": { rent: 110, food: 95, transport: 90, utilities: 95 },
  "London": { rent: 85, food: 80, transport: 95, utilities: 90 },
  "Paris": { rent: 70, food: 75, transport: 70, utilities: 85 },
  "Tokyo": { rent: 60, food: 65, transport: 60, utilities: 80 },
  "Berlin": { rent: 45, food: 55, transport: 55, utilities: 75 },
  "Mumbai": { rent: 15, food: 20, transport: 10, utilities: 25 },
  "Kathmandu": { rent: 8, food: 15, transport: 8, utilities: 18 },
  "Dubai": { rent: 65, food: 60, transport: 50, utilities: 70 },
  "Sydney": { rent: 75, food: 70, transport: 65, utilities: 78 },
  "Toronto": { rent: 70, food: 65, transport: 60, utilities: 72 },
  "Bangkok": { rent: 20, food: 18, transport: 12, utilities: 30 },
  "Singapore": { rent: 80, food: 55, transport: 50, utilities: 70 },
  "Lisbon": { rent: 40, food: 40, transport: 35, utilities: 55 },
};

const cats = ["rent", "food", "transport", "utilities"] as const;

export default function CostOfLiving() {
  const cities = Object.keys(CITIES);
  const [c1, setC1] = useState("New York");
  const [c2, setC2] = useState("London");

  const d1 = CITIES[c1], d2 = CITIES[c2];

  return (
    <ToolLayout title="Cost of Living Compare" description="Compare cost of living between cities" icon={TrendingUp}>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Select value={c1} onValueChange={setC1}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <Select value={c2} onValueChange={setC2}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{cities.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {cats.map((cat) => {
          const v1 = d1[cat], v2 = d2[cat];
          const diff = ((v2 - v1) / v1 * 100).toFixed(0);
          return (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1">
                <span className="capitalize font-medium">{cat}</span>
                <span className={`text-xs ${parseInt(diff) > 0 ? "text-destructive" : "text-primary"}`}>
                  {parseInt(diff) > 0 ? "+" : ""}{diff}%
                </span>
              </div>
              <div className="flex gap-2">
                <div className="flex-1 rounded-md bg-secondary p-2 text-center">
                  <span className="text-sm font-semibold">{v1}</span>
                </div>
                <div className="flex-1 rounded-md bg-secondary p-2 text-center">
                  <span className="text-sm font-semibold">{v2}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted-foreground text-center">Index: NYC = 100 baseline. Higher = more expensive.</p>
    </ToolLayout>
  );
}
