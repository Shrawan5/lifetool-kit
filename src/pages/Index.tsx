import { useState, useEffect } from "react";
import { tools, categoryLabels, type Category } from "@/lib/tools";
import { ToolCard } from "@/components/ToolCard";
import { Input } from "@/components/ui/input";
import { Search, Wrench } from "lucide-react";

const RECENT_KEY = "lifekit-recent-tools";

function getRecentIds(): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function recordToolUsage(toolId: string) {
  const recent = getRecentIds().filter((id) => id !== toolId);
  recent.unshift(toolId);
  localStorage.setItem(RECENT_KEY, JSON.stringify(recent.slice(0, 30)));
}

const categories: Category[] = ["productivity", "finance", "learning", "self", "utility", "ai", "wellness"];

const Index = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Category | "all">("all");
  const [recentIds, setRecentIds] = useState<string[]>([]);

  useEffect(() => {
    setRecentIds(getRecentIds());
  }, []);

  const filtered = tools.filter((t) => {
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = filter === "all" || t.category === filter;
    return matchSearch && matchCat;
  });

  const sorted = [...filtered].sort((a, b) => {
    const ai = recentIds.indexOf(a.id);
    const bi = recentIds.indexOf(b.id);
    if (ai !== -1 && bi !== -1) return ai - bi;
    if (ai !== -1) return -1;
    if (bi !== -1) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
            <Wrench className="h-3.5 w-3.5" /> 30+ Free Tools
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            LifeKit<span className="text-primary">.</span>
          </h1>
          <p className="mt-3 text-muted-foreground">
            Your all-in-one utility hub — no signup required.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-8 space-y-3">
          <div className="relative mx-auto max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-secondary border-border pl-10"
            />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>All</FilterChip>
            {categories.map((c) => (
              <FilterChip key={c} active={filter === c} onClick={() => setFilter(c)}>
                {categoryLabels[c]}
              </FilterChip>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sorted.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-muted-foreground">No tools found.</p>
        )}

        <footer className="mt-16 text-center text-xs text-muted-foreground">
          Built with ♥ — All tools run locally in your browser.
        </footer>
      </div>
    </div>
  );
};

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
        active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

export default Index;
