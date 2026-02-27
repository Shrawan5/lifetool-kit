
# Build All 25 Remaining Tools

## Overview
Currently 5 of 30 tools work. This plan implements all 25 remaining tools as client-side, no-backend utilities following the existing pattern (ToolLayout wrapper, same styling conventions, localStorage for persistence where needed).

## Changes Required

### 1. Create 25 new tool components in `src/pages/tools/`

**Productivity (4 tools):**
- `GoalTracker.tsx` -- Add/check-off daily and weekly goals, stored in localStorage, with progress bars
- `TimeZonePlanner.tsx` -- Select multiple time zones, show a visual hourly overlap grid highlighting working hours (9-5)
- `HolidayFinder.tsx` -- Dropdown of countries with a hardcoded dataset of major public holidays, filterable by month
- `LifeAdmin.tsx` -- Add subscriptions (name, cost, renewal date), store in localStorage, show upcoming renewals sorted by date

**Finance (4 tools):**
- `CostOfLiving.tsx` -- Compare two cities using a hardcoded dataset of relative cost indices (rent, food, transport)
- `FreelancerRate.tsx` -- Input desired annual income, working hours, expenses, vacation weeks to calculate ideal hourly rate
- `InflationCalc.tsx` -- Input an amount, start year, end year; apply average inflation rate to show equivalent value
- `ExpenseSplitter.tsx` -- Add people and expenses, assign who paid and who owes, calculate balances

**Learning (3 tools):**
- `MemoryExercises.tsx` -- Card-flip memory matching game with a grid of emoji pairs
- `VocabularyBuilder.tsx` -- Display a random word from a curated list with definition, example, and "learned" tracking via localStorage
- `CriticalThinking.tsx` -- Show a daily scenario/question from a hardcoded set (rotated by day), with reveal-answer toggle

**Self-Discovery (4 tools):**
- `SwotAnalysis.tsx` -- Four-quadrant text input grid (Strengths, Weaknesses, Opportunities, Threats), exportable as text
- `StressCheck.tsx` -- 10-question Likert-scale questionnaire, calculates a stress score with interpretation
- `LifeDirection.tsx` -- Series of deep reflective questions with text areas, viewable as a summary
- `BrandScore.tsx` -- Checklist/slider scoring across categories (online presence, portfolio, networking, etc.) with a total score

**Wellness (4 tools):**
- `DigitalDetox.tsx` -- Countdown timer (15/30/60 min presets), motivational quotes, session history in localStorage
- `MealPlanner.tsx` -- Random meal plan generator for 7 days from a hardcoded recipe bank, with regenerate option
- `WalkingCalories.tsx` -- Input distance (km/miles) and weight, calculate estimated calories burned using MET formula
- `ScreenTime.tsx` -- Manual daily screen time logger with weekly chart visualization using Recharts

**Utilities (1 tool):**
- `NameExplorer.tsx` -- Input a name, show meaning and origin from a hardcoded dataset of 100+ popular names

**AI-Powered (3 tools -- client-side simulations, no API needed):**
- `SideHustle.tsx` -- Quiz-based idea generator: answer questions about skills/interests, get matched ideas from a curated list
- `RandomIdea.tsx` -- Random creative prompt generator combining format + topic + constraint from word banks
- `AiDecision.tsx` -- Structured decision framework: input a dilemma, answer guided questions, get a clarity score and recommendation
- `ExplainSimple.tsx` -- Input a complex topic, show a simplified explanation from a hardcoded library of 50+ topics

**Learning (1 more):**
- `BiasDetector.tsx` -- Browse a catalog of 20+ cognitive biases with name, description, and real-world example

### 2. Update `src/App.tsx`
- Add 25 new lazy imports
- Add 25 new Route entries

### 3. Update `src/lib/tools.ts`
- Set `ready: true` for all 25 tools

## Technical Notes
- All tools use the existing `ToolLayout` wrapper for consistent navigation and styling
- Tools requiring persistence (Goal Tracker, Life Admin, Digital Detox, Screen Time, Vocabulary Builder) use localStorage
- No external APIs needed -- AI-labeled tools use curated datasets and algorithmic matching
- Screen Time tool uses the already-installed Recharts library for chart visualization
- All data (holidays, names, biases, topics, recipes) is hardcoded within each component file
