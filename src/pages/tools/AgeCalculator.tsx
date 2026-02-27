import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Cake } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { differenceInYears, differenceInMonths, differenceInDays, differenceInHours, format, isPast } from "date-fns";

export default function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [result, setResult] = useState<null | { years: number; months: number; days: number; hours: number; nextBirthday: string }>(null);

  const calculate = () => {
    if (!dob) return;
    const birth = new Date(dob);
    const now = new Date();
    if (birth > now) return;
    const years = differenceInYears(now, birth);
    const months = differenceInMonths(now, birth) % 12;
    const lastBirthday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    const days = differenceInDays(now, new Date(now.getFullYear(), now.getMonth() - months, birth.getDate())) % 30;
    const hours = differenceInHours(now, birth);
    const nextBd = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (isPast(nextBd)) nextBd.setFullYear(nextBd.getFullYear() + 1);
    setResult({ years, months, days, hours, nextBirthday: format(nextBd, "MMMM d, yyyy") });
  };

  return (
    <ToolLayout title="Age Calculator" description="Calculate your exact age & milestones" icon={Cake}>
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Date of Birth</label>
          <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="bg-secondary border-border" />
        </div>
        <Button onClick={calculate} className="w-full">Calculate Age</Button>
        {result && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Years" value={result.years} />
            <Stat label="Months" value={result.months} />
            <Stat label="Days (approx)" value={result.days} />
            <Stat label="Total Hours" value={result.hours.toLocaleString()} />
            <div className="col-span-2 rounded-md bg-primary/10 p-3 text-center">
              <p className="text-xs text-muted-foreground">Next Birthday</p>
              <p className="text-sm font-semibold text-primary">{result.nextBirthday}</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md bg-secondary p-3 text-center">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}
