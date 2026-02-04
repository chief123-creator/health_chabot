import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -4,
              transition: { duration: 0.25 },
            }
      }
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-card transition-shadow hover:shadow-elevated",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
