// Framer Motion animation variants and utilities
import { Variants, Transition } from "framer-motion";

// Default transition for most animations
export const defaultTransition: Transition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1], // Smooth ease
};

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
};

// Page transition variants
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Fade in/out variants
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

// Slide up variants (for staggered children)
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
};

// Scale in variants
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
};

// Stagger container variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Card hover effect
export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)",
  },
  hover: {
    y: -4,
    boxShadow: "0 8px 40px -8px rgba(0,0,0,0.15)",
    transition: { duration: 0.25 },
  },
};

// Button press effect
export const buttonTapVariants: Variants = {
  rest: { scale: 1 },
  tap: { scale: 0.98 },
  hover: { scale: 1.02 },
};

// Chat message variants
export const chatMessageVariants: Variants = {
  hidden: (isUser: boolean) => ({
    opacity: 0,
    x: isUser ? 20 : -20,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Typing indicator variants
export const typingDotVariants: Variants = {
  hidden: { opacity: 0.4, y: 0 },
  visible: (i: number) => ({
    opacity: [0.4, 1, 0.4],
    y: [0, -4, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      delay: i * 0.15,
    },
  }),
};

// Nav link underline animation
export const navLinkVariants: Variants = {
  rest: { width: 0 },
  hover: {
    width: "100%",
    transition: { duration: 0.25 },
  },
  active: { width: "100%" },
};

// Mobile menu slide
export const mobileMenuVariants: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Error shake animation
export const shakeVariants: Variants = {
  shake: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5 },
  },
};

// Skeleton shimmer (keyframes in CSS)
export const shimmerVariants: Variants = {
  shimmer: {
    backgroundPosition: ["200% 0", "-200% 0"],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Hero background float animation
export const floatVariants: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Tab indicator slide
export const tabIndicatorVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

// Entry animation for viewport visibility
export const viewportEntryVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};
