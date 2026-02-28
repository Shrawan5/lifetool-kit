import { useState, useEffect, useRef, useCallback } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Keyboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const englishSentences = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Pack my box with five dozen liquor jugs for the evening party.",
  "A journey of a thousand miles begins with a single brave step.",
  "Creativity is intelligence having fun with new ideas every day.",
  "Success is not final and failure is not fatal keep going forward.",
];

const nepaliSentences = [
  "नेपाल एक सुन्दर देश हो जहाँ हिमालय र तराई दुवै छन्।",
  "शिक्षा जीवनको सबैभन्दा महत्त्वपूर्ण कुरा हो भन्ने कुरामा कसैको दुईमत छैन।",
  "काठमाडौं नेपालको राजधानी हो र यो एक ऐतिहासिक सहर हो।",
  "मेहनत गर्ने मानिसले सधैँ सफलता पाउँछ भन्ने कुरा सत्य हो।",
  "हाम्रो देशको संस्कृति र परम्परा अत्यन्त समृद्ध र विविधतापूर्ण छ।",
];

type Language = "english" | "nepali";

const preetiToUnicode: Record<string, string> = {
  "a": "ब", "b": "द", "c": "अ", "d": "म", "e": "भ", "f": "ा", "g": "न",
  "h": "ज", "i": "ष", "j": "व", "k": "प", "l": "ि", "m": "स", "n": "ल",
  "o": "य", "p": "उ", "q": "त", "r": "च", "s": "क", "t": "ट", "u": "ग",
  "v": "ख", "w": "ध", "x": "ह", "y": "थ", "z": "श",
  "A": "ब्", "B": "ड", "C": "आ", "D": "म्", "E": "भ्", "F": "ँ", "G": "ं",
  "H": "झ", "I": "क्ष", "J": "ओ", "K": "फ", "L": "ी", "M": "ष", "N": "ळ",
  "O": "इ", "P": "ऊ", "Q": "त्", "R": "छ", "S": "क्", "T": "ठ", "U": "घ",
  "V": "ढ", "W": "ध्", "X": "ँ", "Y": "ठ्", "Z": "श्",
  "0": "०", "1": "१", "2": "२", "3": "३", "4": "४",
  "5": "५", "6": "६", "7": "७", "8": "८", "9": "९",
  ")": "ण", "!": "ज्ञ", "@": "ई", "#": "घ्", "$": "द्द",
  "%": "छ्", "^": "ट्", "&": "ड्", "*": "द्ध", "(": "ञ",
  "/": "र", "\\": "्", "]": "े", "}": "ै", "[": "ु", "{": "ू",
  ";": "स्", ":": "ट्ट", "'": "ु", "\"": "ू",
  ",": ",", "<": "?", ".": "।", ">": "श्र",
  "`": "ञ", "~": "त्र",
  " ": " ", "\n": "\n",
};

function convertPreetiToUnicode(preetiText: string): string {
  let result = "";
  for (const char of preetiText) {
    result += preetiToUnicode[char] || char;
  }
  return result;
}

export default function TypingTest() {
  const [language, setLanguage] = useState<Language>("english");
  const [text, setText] = useState(() =>
    englishSentences[Math.floor(Math.random() * englishSentences.length)]
  );
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    const sentences = lang === "english" ? englishSentences : nepaliSentences;
    setText(sentences[Math.floor(Math.random() * sentences.length)]);
    setInput("");
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInput = useCallback(
    (val: string) => {
      if (!started) {
        setStarted(true);
        setStartTime(Date.now());
      }
      setInput(val);
      let correct = 0;
      for (let i = 0; i < val.length; i++) {
        if (val[i] === text[i]) correct++;
      }
      setAccuracy(val.length > 0 ? Math.round((correct / val.length) * 100) : 100);

      if (val.length >= text.length) {
        const elapsed = (Date.now() - (startTime || Date.now())) / 1000 / 60;
        const words = text.split(" ").length;
        setWpm(Math.round(words / (elapsed || 1)));
        setFinished(true);
      }
    },
    [started, startTime, text]
  );

  const reset = () => {
    const sentences = language === "english" ? englishSentences : nepaliSentences;
    setText(sentences[Math.floor(Math.random() * sentences.length)]);
    setInput("");
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(100);
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (started && !finished) {
      const timer = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000 / 60;
        const words = input.split(" ").filter(Boolean).length;
        setWpm(Math.round(words / (elapsed || 1)));
      }, 500);
      return () => clearInterval(timer);
    }
  }, [started, finished, startTime, input]);

  return (
    <ToolLayout title="Typing Speed Test" description="Test your typing speed" icon={Keyboard}>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">Language:</span>
          <Select value={language} onValueChange={(v) => switchLanguage(v as Language)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="nepali">नेपाली (Preeti)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-md bg-secondary p-4 font-mono text-sm leading-relaxed">
          {text.split("").map((char, i) => {
            let cls = "text-muted-foreground";
            if (i < input.length) {
              cls = input[i] === char ? "text-primary" : "text-destructive underline";
            }
            return (
              <span key={i} className={cls}>
                {char}
              </span>
            );
          })}
        </div>

        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => !finished && handleInput(e.target.value)}
          placeholder={language === "english" ? "Start typing here..." : "यहाँ टाइप गर्नुहोस्..."}
          className="w-full resize-none rounded-md border border-border bg-muted p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          rows={3}
          disabled={finished}
          autoFocus
        />

        {language === "nepali" && input.length > 0 && (
          <div className="rounded-md border border-border bg-muted/50 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">नेपाली Preview:</p>
            <p className="text-sm leading-relaxed text-foreground">{convertPreetiToUnicode(input)}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md bg-secondary p-3 text-center">
            <p className="text-xs text-muted-foreground">WPM</p>
            <p className="text-2xl font-bold text-primary">{wpm}</p>
          </div>
          <div className="rounded-md bg-secondary p-3 text-center">
            <p className="text-xs text-muted-foreground">Accuracy</p>
            <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
          </div>
        </div>

        {finished && (
          <Button onClick={reset} className="w-full">
            Try Again
          </Button>
        )}
      </div>
    </ToolLayout>
  );
}
