import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Ruler } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories: Record<string, Record<string, number>> = {
  Length: { Meter: 1, Kilometer: 0.001, Centimeter: 100, Millimeter: 1000, Mile: 0.000621371, Yard: 1.09361, Foot: 3.28084, Inch: 39.3701 },
  Weight: { Kilogram: 1, Gram: 1000, Milligram: 1e6, Pound: 2.20462, Ounce: 35.274, Ton: 0.001 },
  Temperature: { Celsius: 1, Fahrenheit: 1, Kelvin: 1 },
  Volume: { Liter: 1, Milliliter: 1000, Gallon: 0.264172, Quart: 1.05669, Cup: 4.22675 },
};

function convert(value: number, from: string, to: string, cat: string) {
  if (cat === "Temperature") {
    let celsius = from === "Celsius" ? value : from === "Fahrenheit" ? (value - 32) * 5 / 9 : value - 273.15;
    return to === "Celsius" ? celsius : to === "Fahrenheit" ? celsius * 9 / 5 + 32 : celsius + 273.15;
  }
  const units = categories[cat];
  return (value / units[from]) * units[to];
}

export default function UnitConverter() {
  const [cat, setCat] = useState("Length");
  const [from, setFrom] = useState("Meter");
  const [to, setTo] = useState("Kilometer");
  const [value, setValue] = useState("1");

  const units = Object.keys(categories[cat]);
  const result = value ? convert(parseFloat(value) || 0, from, to, cat) : 0;

  return (
    <ToolLayout title="Unit Converter" description="Universal unit converter" icon={Ruler}>
      <div className="space-y-4">
        <Select value={cat} onValueChange={(v) => { setCat(v); setFrom(Object.keys(categories[v])[0]); setTo(Object.keys(categories[v])[1]); }}>
          <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
          <SelectContent>{Object.keys(categories).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
        </Select>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">From</label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent>{units.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-muted-foreground">To</label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="bg-secondary"><SelectValue /></SelectTrigger>
              <SelectContent>{units.map((u) => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </div>
        <Input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="bg-secondary border-border text-lg" />
        <div className="rounded-md bg-primary/10 p-4 text-center">
          <p className="text-xs text-muted-foreground">{value} {from} =</p>
          <p className="text-2xl font-bold text-primary">{result.toFixed(4)} {to}</p>
        </div>
      </div>
    </ToolLayout>
  );
}
