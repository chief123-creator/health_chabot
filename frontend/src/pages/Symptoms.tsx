import { useState } from "react";
import { Activity } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { SymptomInput } from "@/components/symptoms/SymptomInput";
import { ResultCard } from "@/components/symptoms/ResultCard";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { FadeIn } from "@/components/motion/FadeIn";
import { predictSymptoms, PredictResponse } from "@/lib/api";

export default function Symptoms() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (symptoms: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await predictSymptoms(symptoms);
      setResult(response);
    } catch (err) {
      setError(
        "Unable to analyze symptoms. Please make sure the backend server is running at http://localhost:8000"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="hero-gradient min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="mx-auto max-w-2xl">
            {/* Header */}
            <FadeIn delay={0}>
              <div className="mb-10 text-center">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl btn-gradient"
                >
                  <Activity className="h-7 w-7 text-primary-foreground" />
                </motion.div>
                <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  Symptom Checker
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Describe your symptoms in natural language and get educational insights about possible conditions.
                </p>
              </div>
            </FadeIn>

            {/* Input Section */}
            <FadeIn delay={0.1}>
              <motion.div
                initial={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)" }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { boxShadow: "0 8px 40px -8px rgba(0,0,0,0.15)" }
                }
                transition={{ duration: 0.25 }}
                className="rounded-2xl bg-card p-6 sm:p-8"
              >
                <SymptomInput onSubmit={handleSubmit} isLoading={isLoading} />
              </motion.div>
            </FadeIn>

            {/* Results Section */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      animate={prefersReducedMotion ? undefined : { x: [0, -5, 5, -3, 3, 0] }}
                      transition={{ duration: 0.4 }}
                    >
                      <ErrorMessage
                        message={error}
                        onRetry={() => setError(null)}
                      />
                    </motion.div>
                  </motion.div>
                )}
                {result && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <ResultCard result={result} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
