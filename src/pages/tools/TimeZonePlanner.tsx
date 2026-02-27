import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ZONES = [
  { label: "New York (EST)", offset: -5 },
  { label: "Chicago (CST)", offset: -6 },
  { label: "Denver (MST)", offset: -7 },
  { label: "Los Angeles (PST)", offset: -8 },
  { label: "London (GMT)", offset: 0 },
  { label: "Paris (CET)", offset: 1 },
  { label: "Dubai (GST)", offset: 4 },
  { label: "Mumbai (IST)", offset: 5.5 },
  { label: "Kathmandu (NPT)", offset: 5.75 },
  { label: "Bangkok (ICT)", offset: 7 },
  { label: "Shanghai (CST)", offset: 8 },
  { label: "Tokyo (JST)", offset: 9 },
  { label: "Sydney (AEST)", offset: 10 },
  { label: "Auckland (NZST)", offset: 12 },
];

export default function TimeZonePlanner() {
  const [selected, setSelected] = useState<number[]>([0, 4]);
  const [adding, setAdding] = useState("");

  const addZone = () => {
    const idx = parseInt(adding);
    if (!isNaN(idx) && !selected.includes(idx)) setSelected([...selected, idx]);
    setAdding("");
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const isWorkHour = (h: number) => h >= 9 && h < 17;

  const getHour = (baseHour: number, offset: number, refOffset: number) => {
    return ((baseHour + (offset - refOffset) + 24) % 24);
  };

  const refOffset = ZONES[selected[0]]?.offset ?? 0;

  return (
    <ToolLayout title="Time Zone Planner" description="Visual global time overlap finder" icon={Globe}>
      <div className="mb-4 flex gap-2">
        <Select value={adding} onValueChange={setAdding}>
          <SelectTrigger><SelectValue placeholder="Add a time zone..." /></SelectTrigger>
          <SelectContent>
            {ZONES.map((z, i) => (
              <SelectItem key={i} value={i.toString()} disabled={selected.includes(i)}>{z.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={addZone} disabled={!adding}>Add</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr>
              <th className="text-left p-1 min-w-[120px] text-muted-foreground">Zone</th>
              {hours.map((h) => (
                <th key={h} className="p-1 text-muted-foreground font-normal w-8">{h.toString().padStart(2, "0")}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {selected.map((si) => {
              const zone = ZONES[si];
              return (
                <tr key={si}>
                  <td className="p-1 font-medium text-sm flex items-center gap-1">
                    {zone.label}
                    {selected.length > 1 && (
                      <button onClick={() => setSelected(selected.filter((s) => s !== si))} className="text-muted-foreground hover:text-destructive ml-1">×</button>
                    )}
                  </td>
                  {hours.map((h) => {
                    const localH = getHour(h, zone.offset, refOffset);
                    const work = isWorkHour(localH);
                    return (
                      <td key={h} className={`p-1 text-center rounded-sm ${work ? "bg-primary/20 text-primary font-medium" : "text-muted-foreground"}`}>
                        {localH.toString().padStart(2, "0")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Highlighted cells = working hours (9 AM – 5 PM)</p>
    </ToolLayout>
  );
}
