import { useState } from "react";
import { ToolLayout } from "@/components/ToolLayout";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

function checkStrength(pw: string) {
  let score = 0;
  const checks = {
    length: pw.length >= 8,
    upper: /[A-Z]/.test(pw),
    lower: /[a-z]/.test(pw),
    number: /[0-9]/.test(pw),
    special: /[^A-Za-z0-9]/.test(pw),
    long: pw.length >= 14,
  };
  Object.values(checks).forEach((v) => v && score++);
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong", "Excellent"];
  return { score, label: labels[score] || labels[0], checks, percent: Math.round((score / 6) * 100) };
}

export default function PasswordChecker() {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const result = pw ? checkStrength(pw) : null;

  const strengthColor = result
    ? result.percent < 40 ? "bg-destructive" : result.percent < 70 ? "bg-cat-finance" : "bg-primary"
    : "";

  return (
    <ToolLayout title="Password Checker" description="Check your password strength" icon={Lock}>
      <div className="space-y-4">
        <div className="relative">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter a password..."
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            className="bg-secondary border-border pr-10"
          />
          <button
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {result && (
          <>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span className="text-muted-foreground">Strength</span>
                <span className="font-medium text-foreground">{result.label}</span>
              </div>
              <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-500 ${strengthColor}`} style={{ width: `${result.percent}%` }} />
              </div>
            </div>
            <div className="space-y-1.5 text-xs">
              {Object.entries(result.checks).map(([key, ok]) => (
                <div key={key} className={`flex items-center gap-2 ${ok ? "text-primary" : "text-muted-foreground"}`}>
                  <span>{ok ? "✓" : "✗"}</span>
                  <span>{{ length: "8+ characters", upper: "Uppercase letter", lower: "Lowercase letter", number: "Number", special: "Special character", long: "14+ characters" }[key]}</span>
                </div>
              ))}
            </div>
          </>
        )}
        <p className="text-[10px] text-muted-foreground">Your password is never stored or sent anywhere.</p>
      </div>
    </ToolLayout>
  );
}
