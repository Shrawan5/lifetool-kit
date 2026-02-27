import {
  Target, Scale, Globe, CalendarDays, CreditCard, TrendingUp, Calculator,
  Lightbulb, Split, Brain, BookOpen, Keyboard, Puzzle, User, Heart,
  Timer, UtensilsCrossed, Footprints, Monitor, Ruler, Cake, Search,
  Shuffle, Lock, Sparkles, MessageCircle, Eye, Compass, Award, type LucideIcon
} from "lucide-react";

export type Category = "productivity" | "finance" | "learning" | "self" | "utility" | "ai" | "wellness";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  icon: LucideIcon;
  ready: boolean;
}

export const categoryLabels: Record<Category, string> = {
  productivity: "Productivity",
  finance: "Finance",
  learning: "Learning",
  self: "Self-Discovery",
  utility: "Utilities",
  ai: "AI-Powered",
  wellness: "Wellness",
};

export const tools: Tool[] = [
  { id: "goal-tracker", name: "Goal Tracker", description: "Track daily & weekly goals without signup", category: "productivity", icon: Target, ready: true },
  { id: "decision-helper", name: "Decision Helper", description: "Weighted pros & cons calculator", category: "productivity", icon: Scale, ready: true },
  { id: "timezone-planner", name: "Time Zone Planner", description: "Visual global time overlap finder", category: "productivity", icon: Globe, ready: true },
  { id: "holiday-finder", name: "Holiday Finder", description: "Public holidays by country", category: "productivity", icon: CalendarDays, ready: true },
  { id: "life-admin", name: "Life Admin Organizer", description: "Subscriptions & renewal reminders", category: "productivity", icon: CreditCard, ready: true },

  { id: "cost-of-living", name: "Cost of Living Compare", description: "Compare cost of living between cities", category: "finance", icon: TrendingUp, ready: true },
  { id: "freelancer-rate", name: "Freelancer Rate Calc", description: "Calculate your ideal hourly rate", category: "finance", icon: Calculator, ready: true },
  { id: "inflation-calc", name: "Inflation Calculator", description: "See how prices change over time", category: "finance", icon: TrendingUp, ready: true },
  { id: "side-hustle", name: "Side Hustle Ideas", description: "AI-powered idea generator", category: "ai", icon: Lightbulb, ready: true },
  { id: "expense-splitter", name: "Expense Splitter", description: "Split costs for friends & trips", category: "finance", icon: Split, ready: true },

  { id: "memory-exercises", name: "Memory Exercises", description: "Improve your memory with exercises", category: "learning", icon: Brain, ready: true },
  { id: "vocabulary-builder", name: "Vocabulary Builder", description: "Learn new words daily", category: "learning", icon: BookOpen, ready: true },
  { id: "typing-test", name: "Typing Speed Test", description: "Test in English & Nepali Preeti", category: "learning", icon: Keyboard, ready: true },
  { id: "critical-thinking", name: "Critical Thinking", description: "Challenge of the day", category: "learning", icon: Puzzle, ready: true },

  { id: "swot-analysis", name: "SWOT Analysis", description: "Personal strengths & weaknesses", category: "self", icon: User, ready: true },
  { id: "stress-check", name: "Stress Self-Check", description: "Quick stress questionnaire", category: "self", icon: Heart, ready: true },
  { id: "digital-detox", name: "Digital Detox Timer", description: "Take a break from screens", category: "wellness", icon: Timer, ready: true },
  { id: "meal-planner", name: "Meal Planner", description: "Generate weekly meal plans", category: "wellness", icon: UtensilsCrossed, ready: true },
  { id: "walking-calories", name: "Walking Calories", description: "Distance to calories estimator", category: "wellness", icon: Footprints, ready: true },
  { id: "screen-time", name: "Screen Time Tracker", description: "Awareness & tracking tool", category: "wellness", icon: Monitor, ready: true },

  { id: "unit-converter", name: "Unit Converter", description: "Universal unit converter", category: "utility", icon: Ruler, ready: true },
  { id: "age-calculator", name: "Age Calculator", description: "Calculate exact age & milestones", category: "utility", icon: Cake, ready: true },
  { id: "name-explorer", name: "Name Explorer", description: "Meaning & origin of names", category: "utility", icon: Search, ready: true },
  { id: "random-idea", name: "Random Idea Generator", description: "Spark creativity for creators", category: "ai", icon: Shuffle, ready: true },
  { id: "password-checker", name: "Password Checker", description: "Check password strength", category: "utility", icon: Lock, ready: true },
  { id: "ai-decision", name: "AI Decision Clarity", description: "AI-powered decision helper", category: "ai", icon: Sparkles, ready: true },
  { id: "explain-simple", name: "Explain Like I'm 12", description: "Simplify complex topics", category: "ai", icon: MessageCircle, ready: true },
  { id: "bias-detector", name: "Bias Detector", description: "Learn about cognitive biases", category: "learning", icon: Eye, ready: true },
  { id: "life-direction", name: "Life Direction Quiz", description: "Deep reflective questions", category: "self", icon: Compass, ready: true },
  { id: "brand-score", name: "Brand Score Calc", description: "Freelancer personal brand score", category: "self", icon: Award, ready: true },
];
