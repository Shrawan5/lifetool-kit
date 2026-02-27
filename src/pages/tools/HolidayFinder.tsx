import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { CalendarDays } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const HOLIDAYS: Record<string, { name: string; date: string; month: number }[]> = {
  US: [
    { name: "New Year's Day", date: "Jan 1", month: 1 }, { name: "MLK Jr. Day", date: "Jan 20", month: 1 },
    { name: "Presidents' Day", date: "Feb 17", month: 2 }, { name: "Memorial Day", date: "May 26", month: 5 },
    { name: "Independence Day", date: "Jul 4", month: 7 }, { name: "Labor Day", date: "Sep 1", month: 9 },
    { name: "Thanksgiving", date: "Nov 27", month: 11 }, { name: "Christmas Day", date: "Dec 25", month: 12 },
  ],
  UK: [
    { name: "New Year's Day", date: "Jan 1", month: 1 }, { name: "Good Friday", date: "Apr 18", month: 4 },
    { name: "Easter Monday", date: "Apr 21", month: 4 }, { name: "Early May Bank", date: "May 5", month: 5 },
    { name: "Spring Bank", date: "May 26", month: 5 }, { name: "Summer Bank", date: "Aug 25", month: 8 },
    { name: "Christmas Day", date: "Dec 25", month: 12 }, { name: "Boxing Day", date: "Dec 26", month: 12 },
  ],
  India: [
    { name: "Republic Day", date: "Jan 26", month: 1 }, { name: "Holi", date: "Mar 14", month: 3 },
    { name: "Independence Day", date: "Aug 15", month: 8 }, { name: "Gandhi Jayanti", date: "Oct 2", month: 10 },
    { name: "Diwali", date: "Oct 20", month: 10 }, { name: "Christmas", date: "Dec 25", month: 12 },
  ],
  Nepal: [
    { name: "Prithvi Jayanti", date: "Jan 11", month: 1 }, { name: "Democracy Day", date: "Feb 19", month: 2 },
    { name: "Holi", date: "Mar 14", month: 3 }, { name: "Nepali New Year", date: "Apr 14", month: 4 },
    { name: "Buddha Jayanti", date: "May 12", month: 5 }, { name: "Republic Day", date: "May 28", month: 5 },
    { name: "Dashain", date: "Oct 2", month: 10 }, { name: "Tihar", date: "Oct 20", month: 10 },
    { name: "Constitution Day", date: "Sep 19", month: 9 },
  ],
  Japan: [
    { name: "New Year's Day", date: "Jan 1", month: 1 }, { name: "Coming of Age", date: "Jan 13", month: 1 },
    { name: "National Foundation", date: "Feb 11", month: 2 }, { name: "Showa Day", date: "Apr 29", month: 4 },
    { name: "Children's Day", date: "May 5", month: 5 }, { name: "Marine Day", date: "Jul 21", month: 7 },
    { name: "Culture Day", date: "Nov 3", month: 11 }, { name: "Labor Thanksgiving", date: "Nov 23", month: 11 },
  ],
  Australia: [
    { name: "New Year's Day", date: "Jan 1", month: 1 }, { name: "Australia Day", date: "Jan 26", month: 1 },
    { name: "Good Friday", date: "Apr 18", month: 4 }, { name: "Anzac Day", date: "Apr 25", month: 4 },
    { name: "Queen's Birthday", date: "Jun 9", month: 6 }, { name: "Christmas Day", date: "Dec 25", month: 12 },
    { name: "Boxing Day", date: "Dec 26", month: 12 },
  ],
};

const MONTHS = ["All", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function HolidayFinder() {
  const [country, setCountry] = useState("US");
  const [month, setMonth] = useState("0");

  const holidays = HOLIDAYS[country] || [];
  const filtered = month === "0" ? holidays : holidays.filter((h) => h.month === parseInt(month));

  return (
    <ToolLayout title="Holiday Finder" description="Public holidays by country" icon={CalendarDays}>
      <div className="flex gap-2 mb-6">
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.keys(HOLIDAYS).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={month} onValueChange={setMonth}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {MONTHS.map((m, i) => <SelectItem key={i} value={i.toString()}>{m}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No holidays found for this filter.</p>}
        {filtered.map((h, i) => (
          <div key={i} className="flex justify-between items-center rounded-md border border-border p-3">
            <span className="font-medium">{h.name}</span>
            <span className="text-sm text-muted-foreground">{h.date}</span>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
