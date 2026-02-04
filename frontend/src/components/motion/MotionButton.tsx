import { motion, useReducedMotion, HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { VariantProps } from "class-variance-authority";

type MotionButtonProps = HTMLMotionProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    children: React.ReactNode;
  };

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, className, variant, size, disabled, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileHover={
          disabled || prefersReducedMotion
            ? undefined
            : { scale: 1.02 }
        }
        whileTap={
          disabled || prefersReducedMotion
            ? undefined
            : { scale: 0.98 }
        }
        transition={{ duration: 0.15 }}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MotionButton.displayName = "MotionButton";
