import { AlertTriangle, Pill, Activity, CheckCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PredictResponse } from "@/lib/api";

interface ResultCardProps {
  result: PredictResponse;
}

export function ResultCard({ result }: ResultCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      {/* Predicted Condition */}
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={
            prefersReducedMotion
              ? undefined
              : { y: -2, boxShadow: "0 8px 40px -8px rgba(0,0,0,0.15)" }
          }
          transition={{ duration: 0.25 }}
        >
          <Card className="shadow-card overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    delay: 0.2 
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
                >
                  <Activity className="h-5 w-5 text-primary" />
                </motion.div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground">Predicted Condition</span>
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.3 }}
                    className="text-xl font-bold text-foreground"
                  >
                    {result.disease}
                  </motion.p>
                </div>
              </CardTitle>
            </CardHeader>
          </Card>
        </motion.div>
      </motion.div>

      {/* Suggested Medicines */}
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={
            prefersReducedMotion
              ? undefined
              : { y: -2, boxShadow: "0 8px 40px -8px rgba(0,0,0,0.15)" }
          }
          transition={{ duration: 0.25 }}
        >
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Pill className="h-5 w-5 text-accent" />
                Suggested Medicines
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result.medicines && result.medicines.length > 0 ? (
                <div className="space-y-4">
                  {result.medicines.map((medicine : any, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: prefersReducedMotion ? 0 : 0.4 + index * 0.08,
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { y: -2 }
                      }
                      className="border rounded-lg p-4"
                    >
                      {/* Medicine Name */}
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        {medicine.name}
                      </h3>

                      {/* Uses */}
                      {medicine.uses && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {medicine.uses}
                        </p>
                      )}

                      {/* Composition */}
                      {medicine.composition && (
                        <p className="text-sm mt-1">
                          <span className="font-medium">Composition:</span> {medicine.composition}
                        </p>
                      )}

                      {/* Manufacturer */}
                      {medicine.manufacturerName && (
                        <p className="text-sm mt-1">
                          <span className="font-medium">Manufacturer:</span> {medicine.manufacturerName}
                        </p>
                      )}

                      {/* Price */}
                      {medicine.priceRupee && (
                        <p className="text-sm mt-1">
                          <span className="font-medium">Price:</span> ₹{medicine.priceRupee}
                        </p>
                      )}

                      {/* Side effects */}
                      {medicine.sideEffects && (
                        <div className="flex gap-2 flex-wrap mt-2">
                          {(Array.isArray(medicine.sideEffects)
                            ? medicine.sideEffects
                            : medicine.sideEffects.split(",")
                          ).map((effect: string, index: number) => (
                            <Badge key={index} variant="outline">
                              {effect.trim()}
                            </Badge>
                          ))}
                        </div>
                      )}

                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No specific medicines suggested. Please consult a healthcare provider.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      {/* Disclaimer */}
      <motion.div variants={itemVariants}>
        <motion.div
          whileHover={
            prefersReducedMotion
              ? undefined
              : { y: -2 }
          }
          transition={{ duration: 0.25 }}
        >
          <Card className="border-warning/30 bg-warning/5 shadow-soft">
            <CardContent className="flex items-start gap-3 pt-6">
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { scale: [1, 1.1, 1] }
                }
                transition={{ duration: 2, repeat: Infinity }}
              >
                <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
              </motion.div>
              <div>
                <p className="font-medium text-foreground">Important Disclaimer</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {result.disclaimer || "This prediction is for educational purposes only and should not be used as a substitute for professional medical advice. Please consult a healthcare provider for proper diagnosis and treatment."}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}