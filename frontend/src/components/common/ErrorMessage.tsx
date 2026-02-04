import { AlertCircle, RefreshCw } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ title = "Something went wrong", message, onRetry }: ErrorMessageProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-destructive/30 bg-destructive/5 shadow-soft">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : { scale: [1, 1.1, 1] }
            }
            transition={{ duration: 0.5 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10"
          >
            <AlertCircle className="h-6 w-6 text-destructive" />
          </motion.div>
          <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{message}</p>
          </div>
          {onRetry && (
            <motion.div
              whileHover={prefersReducedMotion ? undefined : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
            >
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
