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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
