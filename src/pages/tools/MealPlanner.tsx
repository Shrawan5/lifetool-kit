import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { UtensilsCrossed, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const MEALS = {
  breakfast: ["Oatmeal with berries", "Scrambled eggs & toast", "Yogurt parfait", "Smoothie bowl", "Avocado toast", "Pancakes", "Cereal & milk", "Breakfast burrito", "French toast", "Granola bar & fruit"],
  lunch: ["Grilled chicken salad", "Veggie wrap", "Pasta primavera", "Rice & curry", "Tomato soup & sandwich", "Poke bowl", "Caesar salad", "Burrito bowl", "Stir-fry noodles", "Falafel plate"],
  dinner: ["Salmon & vegetables", "Chicken stir-fry", "Spaghetti bolognese", "Tacos", "Grilled steak & potatoes", "Vegetable curry", "Pizza", "Pad Thai", "Roast chicken", "Lentil soup & bread"],
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }

function generatePlan() {
  return DAYS.map((day) => ({
    day,
    breakfast: pick(MEALS.breakfast),
    lunch: pick(MEALS.lunch),
    dinner: pick(MEALS.dinner),
  }));
}

export default function MealPlanner() {
  const [plan, setPlan] = useState(generatePlan);

  return (
    <ToolLayout title="Meal Planner" description="Generate weekly meal plans" icon={UtensilsCrossed}>
      <div className="flex justify-end mb-4">
        <Button variant="outline" size="sm" onClick={() => setPlan(generatePlan())}>
          <RefreshCw className="h-4 w-4 mr-2" />Regenerate
        </Button>
      </div>

      <div className="space-y-3">
        {plan.map((p) => (
          <div key={p.day} className="rounded-md border border-border p-3">
            <p className="font-semibold text-sm mb-2">{p.day}</p>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div><span className="text-muted-foreground block">Breakfast</span>{p.breakfast}</div>
              <div><span className="text-muted-foreground block">Lunch</span>{p.lunch}</div>
              <div><span className="text-muted-foreground block">Dinner</span>{p.dinner}</div>
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
