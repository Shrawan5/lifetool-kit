import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";

const BIASES = [
  { name: "Confirmation Bias", desc: "Favoring information that confirms your existing beliefs.", ex: "Only reading news sources that agree with your political views." },
  { name: "Anchoring Bias", desc: "Relying too heavily on the first piece of information encountered.", ex: "A shirt seems cheap at $50 after seeing one priced at $200." },
  { name: "Dunning-Kruger Effect", desc: "People with low ability overestimate their competence.", ex: "A beginner guitarist thinking they're ready to perform professionally." },
  { name: "Sunk Cost Fallacy", desc: "Continuing something because of previously invested resources.", ex: "Finishing a bad movie because you already paid for the ticket." },
  { name: "Availability Heuristic", desc: "Overestimating the likelihood of events you can easily recall.", ex: "Thinking plane crashes are common after seeing one on the news." },
  { name: "Bandwagon Effect", desc: "Adopting beliefs because many other people hold them.", ex: "Buying a trending stock just because everyone else is." },
  { name: "Survivorship Bias", desc: "Focusing on successes while ignoring failures.", ex: "Studying only successful startups and concluding startups are easy." },
  { name: "Halo Effect", desc: "Letting one positive trait influence overall judgment.", ex: "Assuming attractive people are also smarter and kinder." },
  { name: "Negativity Bias", desc: "Giving more weight to negative experiences than positive ones.", ex: "Remembering one criticism more than ten compliments." },
  { name: "Status Quo Bias", desc: "Preferring things to stay the same.", ex: "Sticking with an expensive phone plan because switching feels hard." },
  { name: "Framing Effect", desc: "Being influenced by how information is presented.", ex: "'90% fat-free' sounds better than '10% fat', even though they're the same." },
  { name: "Hindsight Bias", desc: "Believing you predicted an outcome after it happened.", ex: "Saying 'I knew it!' after a team wins, even though you weren't sure." },
  { name: "Self-Serving Bias", desc: "Attributing success to yourself and failure to external factors.", ex: "Taking credit for a group project's success but blaming teammates for failure." },
  { name: "Optimism Bias", desc: "Believing you're less likely to experience negative events.", ex: "Thinking 'It won't happen to me' about car accidents." },
  { name: "Recency Bias", desc: "Giving more importance to recent events.", ex: "Judging a stock by last week's performance, not its 10-year track record." },
  { name: "Authority Bias", desc: "Trusting someone just because they're an authority figure.", ex: "Believing a celebrity's health advice over a doctor's." },
  { name: "In-Group Bias", desc: "Favoring members of your own group.", ex: "Hiring someone from your university over an equally qualified outsider." },
  { name: "Fundamental Attribution Error", desc: "Blaming others' actions on character, your own on circumstances.", ex: "Thinking someone who cut you off is rude, but when you do it, it's because you're late." },
  { name: "Peak-End Rule", desc: "Judging an experience by its peak and end, not the whole.", ex: "Rating a vacation great because the last day was amazing, despite rain the rest." },
  { name: "Mere Exposure Effect", desc: "Preferring things simply because you're familiar with them.", ex: "Liking a song more after hearing it multiple times." },
  { name: "Choice-Supportive Bias", desc: "Retroactively attributing positive features to a choice you made.", ex: "Convincing yourself your phone is better than the one you almost bought." },
];

export default function BiasDetector() {
  const [query, setQuery] = useState("");
  const filtered = query.trim() ? BIASES.filter((b) => b.name.toLowerCase().includes(query.toLowerCase())) : BIASES;

  return (
    <ToolLayout title="Bias Detector" description="Learn about cognitive biases" icon={Eye}>
      <Input placeholder="Search biases..." value={query} onChange={(e) => setQuery(e.target.value)} className="mb-6" />

      <div className="space-y-3 max-h-[450px] overflow-y-auto">
        {filtered.map((b) => (
          <div key={b.name} className="rounded-md border border-border p-4">
            <h3 className="font-semibold mb-1">{b.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{b.desc}</p>
            <p className="text-xs text-muted-foreground italic">Example: {b.ex}</p>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
