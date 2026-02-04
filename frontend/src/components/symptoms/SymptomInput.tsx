import { useState } from "react";
import { Search, Loader2, Stethoscope } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface SymptomInputProps {
  onSubmit: (symptoms: string) => void;
  isLoading: boolean;
}

export function SymptomInput({ onSubmit, isLoading }: SymptomInputProps) {
  const [symptoms, setSymptoms] = useState("");
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms.trim()) {
      onSubmit(symptoms.trim());
    }
  };

  const exampleSymptoms = [
    "fever, cough, headache",
    "stomach pain, nausea",
    "sore throat, runny nose",
    "fatigue, body aches",
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <div className="absolute left-4 top-4 text-muted-foreground">
          <Stethoscope className="h-5 w-5" />
        </div>
        <Textarea
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Describe your symptoms... e.g., fever, cough, headache"
          className="min-h-[140px] resize-none pl-12 text-base shadow-soft focus:shadow-card focus:ring-2 focus:ring-primary/20 transition-all"
          disabled={isLoading}
        />
      </div>

      {/* Example Symptoms */}
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-muted-foreground">Try:</span>
        {exampleSymptoms.map((example, index) => (
          <motion.button
            key={example}
            type="button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: prefersReducedMotion ? 0 : 0.3, 
              delay: prefersReducedMotion ? 0 : index * 0.05 
            }}
            whileHover={prefersReducedMotion ? undefined : { scale: 1.05, y: -2 }}
            whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
            onClick={() => setSymptoms(example)}
            className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            {example}
          </motion.button>
        ))}
      </div>

      <motion.div
        whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
        whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
      >
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="w-full"
          disabled={!symptoms.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Analyzing Symptoms...
            </>
          ) : (
            <>
              <Search className="h-5 w-5" />
              Check Symptoms
            </>
          )}
        </Button>
      </motion.div>
    </form>
  );
}
