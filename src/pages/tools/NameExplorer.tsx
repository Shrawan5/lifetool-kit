import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const NAMES: Record<string, { meaning: string; origin: string }> = {
  "Aarav": { meaning: "Peaceful, calm", origin: "Sanskrit" },
  "Aisha": { meaning: "Living, prosperous", origin: "Arabic" },
  "Akira": { meaning: "Bright, clear", origin: "Japanese" },
  "Alexander": { meaning: "Defender of the people", origin: "Greek" },
  "Amara": { meaning: "Grace, eternal", origin: "Igbo/Sanskrit" },
  "Ananya": { meaning: "Unique, matchless", origin: "Sanskrit" },
  "Arjun": { meaning: "Bright, shining", origin: "Sanskrit" },
  "Benjamin": { meaning: "Son of the right hand", origin: "Hebrew" },
  "Charlotte": { meaning: "Free woman", origin: "French" },
  "Daniel": { meaning: "God is my judge", origin: "Hebrew" },
  "Elena": { meaning: "Shining light", origin: "Greek" },
  "Emma": { meaning: "Whole, universal", origin: "Germanic" },
  "Ethan": { meaning: "Strong, firm", origin: "Hebrew" },
  "Fatima": { meaning: "Captivating, one who abstains", origin: "Arabic" },
  "Gabriel": { meaning: "God is my strength", origin: "Hebrew" },
  "Hana": { meaning: "Flower, blossom", origin: "Japanese/Arabic" },
  "Isabella": { meaning: "Pledged to God", origin: "Italian/Spanish" },
  "James": { meaning: "Supplanter", origin: "Hebrew" },
  "Kai": { meaning: "Sea, ocean", origin: "Hawaiian/Japanese" },
  "Krishna": { meaning: "Dark, all-attractive", origin: "Sanskrit" },
  "Liam": { meaning: "Strong-willed warrior", origin: "Irish" },
  "Luna": { meaning: "Moon", origin: "Latin" },
  "Maya": { meaning: "Illusion, dream", origin: "Sanskrit" },
  "Mohammed": { meaning: "Praiseworthy", origin: "Arabic" },
  "Naomi": { meaning: "Pleasant, beautiful", origin: "Hebrew" },
  "Noah": { meaning: "Rest, comfort", origin: "Hebrew" },
  "Olivia": { meaning: "Olive tree", origin: "Latin" },
  "Priya": { meaning: "Beloved, dear", origin: "Sanskrit" },
  "Raj": { meaning: "King, ruler", origin: "Sanskrit" },
  "Sakura": { meaning: "Cherry blossom", origin: "Japanese" },
  "Samuel": { meaning: "Heard by God", origin: "Hebrew" },
  "Sara": { meaning: "Princess", origin: "Hebrew" },
  "Sita": { meaning: "Furrow, earth-born", origin: "Sanskrit" },
  "Sofia": { meaning: "Wisdom", origin: "Greek" },
  "Yuki": { meaning: "Snow, happiness", origin: "Japanese" },
  "Zara": { meaning: "Blooming flower, princess", origin: "Arabic/Hebrew" },
  "Aiden": { meaning: "Little fire", origin: "Irish" },
  "Chloe": { meaning: "Blooming, green shoot", origin: "Greek" },
  "David": { meaning: "Beloved", origin: "Hebrew" },
  "Grace": { meaning: "Charm, goodness", origin: "Latin" },
  "Leo": { meaning: "Lion", origin: "Latin" },
  "Mia": { meaning: "Mine, beloved", origin: "Scandinavian" },
  "Oscar": { meaning: "Divine spear", origin: "Irish" },
  "Ruby": { meaning: "Red gemstone", origin: "Latin" },
  "Sanjay": { meaning: "Triumphant", origin: "Sanskrit" },
  "Tara": { meaning: "Star, hill", origin: "Sanskrit/Irish" },
  "Uma": { meaning: "Light, tranquility", origin: "Sanskrit" },
  "Victor": { meaning: "Conqueror", origin: "Latin" },
  "William": { meaning: "Resolute protector", origin: "Germanic" },
  "Yusuf": { meaning: "God increases", origin: "Arabic/Hebrew" },
};

export default function NameExplorer() {
  const [query, setQuery] = useState("");
  const names = Object.keys(NAMES);
  const filtered = query.trim() ? names.filter((n) => n.toLowerCase().includes(query.toLowerCase())) : names;

  return (
    <ToolLayout title="Name Explorer" description="Meaning & origin of names" icon={Search}>
      <Input placeholder="Search a name..." value={query} onChange={(e) => setQuery(e.target.value)} className="mb-6" />

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">No names found.</p>}
        {filtered.map((name) => (
          <div key={name} className="rounded-md border border-border p-3">
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{NAMES[name].meaning}</p>
            <p className="text-xs text-muted-foreground">Origin: {NAMES[name].origin}</p>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
