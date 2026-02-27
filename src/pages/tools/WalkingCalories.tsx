import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Footprints } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function WalkingCalories() {
  const [distance, setDistance] = useState("5");
  const [unit, setUnit] = useState("km");
  const [weight, setWeight] = useState("70");
  const [weightUnit, setWeightUnit] = useState("kg");

  const distKm = unit === "miles" ? (parseFloat(distance) || 0) * 1.60934 : (parseFloat(distance) || 0);
  const weightKg = weightUnit === "lbs" ? (parseFloat(weight) || 0) * 0.453592 : (parseFloat(weight) || 0);
  // MET for walking ≈ 3.5, Calories = MET * weight(kg) * duration(hr)
  // avg speed 5 km/h → duration = distKm / 5
  const durationHr = distKm / 5;
  const calories = 3.5 * weightKg * durationHr;
  const steps = Math.round(distKm * 1312); // ~1312 steps/km

  return (
    <ToolLayout title="Walking Calories" description="Distance to calories estimator" icon={Footprints}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div><Label>Distance</Label><Input type="number" value={distance} onChange={(e) => setDistance(e.target.value)} /></div>
          <div><Label>Unit</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="km">Kilometers</SelectItem><SelectItem value="miles">Miles</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div><Label>Weight</Label><Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} /></div>
          <div><Label>Unit</Label>
            <Select value={weightUnit} onValueChange={setWeightUnit}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="kg">Kilograms</SelectItem><SelectItem value="lbs">Pounds</SelectItem></SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-lg bg-secondary p-4">
          <p className="text-2xl font-bold text-primary">{calories.toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">Calories</p>
        </div>
        <div className="rounded-lg bg-secondary p-4">
          <p className="text-2xl font-bold text-primary">{(durationHr * 60).toFixed(0)}</p>
          <p className="text-xs text-muted-foreground">Minutes</p>
        </div>
        <div className="rounded-lg bg-secondary p-4">
          <p className="text-2xl font-bold text-primary">{steps.toLocaleString()}</p>
          <p className="text-xs text-muted-foreground">Steps</p>
        </div>
      </div>
    </ToolLayout>
  );
}
