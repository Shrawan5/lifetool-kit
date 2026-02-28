import { Tool, Category } from "@/lib/tools";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { recordToolUsage } from "@/pages/Index";

const catColor: Record<Category, string> = {
  productivity: "bg-cat-productivity/15 text-cat-productivity border-cat-productivity/30",
  finance: "bg-cat-finance/15 text-cat-finance border-cat-finance/30",
  learning: "bg-cat-learning/15 text-cat-learning border-cat-learning/30",
  self: "bg-cat-self/15 text-cat-self border-cat-self/30",
  utility: "bg-cat-utility/15 text-cat-utility border-cat-utility/30",
  ai: "bg-cat-ai/15 text-cat-ai border-cat-ai/30",
  wellness: "bg-cat-wellness/15 text-cat-wellness border-cat-wellness/30",
};

const iconBg: Record<Category, string> = {
  productivity: "text-cat-productivity",
  finance: "text-cat-finance",
  learning: "text-cat-learning",
  self: "text-cat-self",
  utility: "text-cat-utility",
  ai: "text-cat-ai",
  wellness: "text-cat-wellness",
};

export function ToolCard({ tool, index }: { tool: Tool; index: number }) {
  const Icon = tool.icon;
  const content = (
    <div
      className={`group relative flex flex-col gap-3 rounded-lg border border-border bg-card p-5 glow-hover cursor-pointer opacity-0 animate-fade-in ${!tool.ready ? "opacity-60" : ""}`}
      style={{ animationDelay: `${index * 30}ms`, animationFillMode: "forwards" }}
    >
      <div className="flex items-start justify-between">
        <div className={`rounded-md bg-secondary p-2 ${iconBg[tool.category]}`}>
          <Icon className="h-5 w-5" />
        </div>
        {!tool.ready && (
          <Badge variant="outline" className="text-[10px] border-muted-foreground/30 text-muted-foreground">
            Soon
          </Badge>
        )}
      </div>
      <div>
        <h3 className="font-display text-sm font-semibold text-foreground">{tool.name}</h3>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{tool.description}</p>
      </div>
      <Badge variant="outline" className={`w-fit text-[10px] ${catColor[tool.category]}`}>
        {tool.category}
      </Badge>
    </div>
  );

  if (tool.ready) {
    return <Link to={`/tool/${tool.id}`} onClick={() => recordToolUsage(tool.id)}>{content}</Link>;
  }
  return content;
}
