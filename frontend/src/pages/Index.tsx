import { Link } from "react-router-dom";
import { Stethoscope, Search, MessageCircle, Shield, Heart, Activity } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Layout } from "@/components/layout/Layout";
import { AnimatedCard } from "@/components/motion/AnimatedCard";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";

const features = [
  {
    icon: Stethoscope,
    title: "Symptom Analysis",
    description: "Describe your symptoms in natural language and get educational insights about possible conditions.",
  },
  {
    icon: Search,
    title: "Medicine Search",
    description: "Search for medicines by name or upload an image of a medicine strip for instant information.",
  },
  {
    icon: MessageCircle,
    title: "Chat Assistant",
    description: "Have a conversation about your health concerns with our AI-powered educational assistant.",
  },
];

export default function Index() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -15, 0],
                    scale: [1, 1.05, 1],
                  }
            }
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          />
          <motion.div
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, 15, 0],
                    scale: [1, 1.05, 1],
                  }
            }
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl"
          />
        </div>

        <div className="container relative mx-auto px-4 py-20 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <FadeIn delay={0}>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Heart className="h-4 w-4" />
                <span>Educational Health Assistant</span>
              </div>
            </FadeIn>

            {/* Headline - Staggered */}
            <StaggerContainer staggerDelay={0.08} initialDelay={0.1}>
              <StaggerItem>
                <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Describe your symptoms.{" "}
                  <span className="text-gradient">Get guidance instantly.</span>
                </h1>
              </StaggerItem>

              {/* Subheadline */}
              <StaggerItem className="mt-6">
                <p className="text-lg text-muted-foreground sm:text-xl">
                  SymptoCare uses AI to help you understand your symptoms and learn about medicines. 
                  Fast, educational, and designed with care.
                </p>
              </StaggerItem>

              {/* CTA Buttons */}
              <StaggerItem className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  <Button asChild variant="gradient" size="xl">
                    <Link to="/symptoms">
                      <Stethoscope className="h-5 w-5" />
                      Check Symptoms
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                >
                  <Button asChild variant="outline" size="xl">
                    <Link to="/medicine">
                      <Search className="h-5 w-5" />
                      Search Medicine
                    </Link>
                  </Button>
                </motion.div>
              </StaggerItem>
            </StaggerContainer>

            {/* Trust Indicators */}
            <FadeIn delay={0.5}>
              <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  className="flex items-center gap-2"
                >
                  <Shield className="h-4 w-4 text-success" />
                  <span>Privacy First</span>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  className="flex items-center gap-2"
                >
                  <Activity className="h-4 w-4 text-primary" />
                  <span>ML-Powered Analysis</span>
                </motion.div>
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { y: -2 }}
                  className="flex items-center gap-2"
                >
                  <Heart className="h-4 w-4 text-destructive" />
                  <span>Educational Purpose</span>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <FadeIn direction="up">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                How SymptoCare Helps You Learn
              </h2>
              <p className="mt-4 text-muted-foreground">
                Explore our educational tools designed to help you understand health information better.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <AnimatedCard
                  key={feature.title}
                  delay={index * 0.1}
                  className="group"
                >
                  <CardContent className="flex flex-col items-center p-8 text-center">
                    <motion.div
                      whileHover={
                        prefersReducedMotion
                          ? undefined
                          : { scale: 1.1, rotate: 5 }
                      }
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/20"
                    >
                      <Icon className="h-7 w-7 text-primary" />
                    </motion.div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <FadeIn direction="up">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-2xl font-bold text-foreground sm:text-3xl">
              Ready to explore?
            </h2>
            <p className="mt-3 text-muted-foreground">
              Start your health education journey with SymptoCare today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                <Button asChild variant="gradient" size="lg">
                  <Link to="/symptoms">Get Started</Link>
                </Button>
              </motion.div>
              <motion.div
                whileHover={prefersReducedMotion ? undefined : { scale: 1.03 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              >
                <Button asChild variant="ghost" size="lg">
                  <Link to="/about">Learn More</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </FadeIn>
      </section>
    </Layout>
  );
}
