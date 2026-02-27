import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const AgeCalculator = lazy(() => import("./pages/tools/AgeCalculator"));
const PasswordChecker = lazy(() => import("./pages/tools/PasswordChecker"));
const UnitConverter = lazy(() => import("./pages/tools/UnitConverter"));
const DecisionHelper = lazy(() => import("./pages/tools/DecisionHelper"));
const TypingTest = lazy(() => import("./pages/tools/TypingTest"));
const GoalTracker = lazy(() => import("./pages/tools/GoalTracker"));
const TimeZonePlanner = lazy(() => import("./pages/tools/TimeZonePlanner"));
const HolidayFinder = lazy(() => import("./pages/tools/HolidayFinder"));
const LifeAdmin = lazy(() => import("./pages/tools/LifeAdmin"));
const CostOfLiving = lazy(() => import("./pages/tools/CostOfLiving"));
const FreelancerRate = lazy(() => import("./pages/tools/FreelancerRate"));
const InflationCalc = lazy(() => import("./pages/tools/InflationCalc"));
const ExpenseSplitter = lazy(() => import("./pages/tools/ExpenseSplitter"));
const MemoryExercises = lazy(() => import("./pages/tools/MemoryExercises"));
const VocabularyBuilder = lazy(() => import("./pages/tools/VocabularyBuilder"));
const CriticalThinking = lazy(() => import("./pages/tools/CriticalThinking"));
const SwotAnalysis = lazy(() => import("./pages/tools/SwotAnalysis"));
const StressCheck = lazy(() => import("./pages/tools/StressCheck"));
const LifeDirection = lazy(() => import("./pages/tools/LifeDirection"));
const BrandScore = lazy(() => import("./pages/tools/BrandScore"));
const DigitalDetox = lazy(() => import("./pages/tools/DigitalDetox"));
const MealPlanner = lazy(() => import("./pages/tools/MealPlanner"));
const WalkingCalories = lazy(() => import("./pages/tools/WalkingCalories"));
const ScreenTime = lazy(() => import("./pages/tools/ScreenTime"));
const NameExplorer = lazy(() => import("./pages/tools/NameExplorer"));
const SideHustle = lazy(() => import("./pages/tools/SideHustle"));
const RandomIdea = lazy(() => import("./pages/tools/RandomIdea"));
const AiDecision = lazy(() => import("./pages/tools/AiDecision"));
const ExplainSimple = lazy(() => import("./pages/tools/ExplainSimple"));
const BiasDetector = lazy(() => import("./pages/tools/BiasDetector"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-muted-foreground">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tool/age-calculator" element={<AgeCalculator />} />
            <Route path="/tool/password-checker" element={<PasswordChecker />} />
            <Route path="/tool/unit-converter" element={<UnitConverter />} />
            <Route path="/tool/decision-helper" element={<DecisionHelper />} />
            <Route path="/tool/typing-test" element={<TypingTest />} />
            <Route path="/tool/goal-tracker" element={<GoalTracker />} />
            <Route path="/tool/timezone-planner" element={<TimeZonePlanner />} />
            <Route path="/tool/holiday-finder" element={<HolidayFinder />} />
            <Route path="/tool/life-admin" element={<LifeAdmin />} />
            <Route path="/tool/cost-of-living" element={<CostOfLiving />} />
            <Route path="/tool/freelancer-rate" element={<FreelancerRate />} />
            <Route path="/tool/inflation-calc" element={<InflationCalc />} />
            <Route path="/tool/expense-splitter" element={<ExpenseSplitter />} />
            <Route path="/tool/memory-exercises" element={<MemoryExercises />} />
            <Route path="/tool/vocabulary-builder" element={<VocabularyBuilder />} />
            <Route path="/tool/critical-thinking" element={<CriticalThinking />} />
            <Route path="/tool/swot-analysis" element={<SwotAnalysis />} />
            <Route path="/tool/stress-check" element={<StressCheck />} />
            <Route path="/tool/life-direction" element={<LifeDirection />} />
            <Route path="/tool/brand-score" element={<BrandScore />} />
            <Route path="/tool/digital-detox" element={<DigitalDetox />} />
            <Route path="/tool/meal-planner" element={<MealPlanner />} />
            <Route path="/tool/walking-calories" element={<WalkingCalories />} />
            <Route path="/tool/screen-time" element={<ScreenTime />} />
            <Route path="/tool/name-explorer" element={<NameExplorer />} />
            <Route path="/tool/side-hustle" element={<SideHustle />} />
            <Route path="/tool/random-idea" element={<RandomIdea />} />
            <Route path="/tool/ai-decision" element={<AiDecision />} />
            <Route path="/tool/explain-simple" element={<ExplainSimple />} />
            <Route path="/tool/bias-detector" element={<BiasDetector />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
