import { AlertTriangle, Shield, Brain, Heart, Stethoscope, BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FadeIn } from "@/components/motion/FadeIn";
import { AnimatedCard } from "@/components/motion/AnimatedCard";
import { StaggerContainer, StaggerItem } from "@/components/motion/StaggerContainer";

const features = [
  {
    icon: Stethoscope,
    title: "Symptom Analysis",
    description: "Describe your symptoms in natural language and receive educational insights about potential conditions.",
    color: "bg-primary/10",
    iconColor: "text-primary",
  },
  {
    icon: Brain,
    title: "ML-Powered",
    description: "Uses machine learning models to analyze symptoms and provide relevant health information.",
    color: "bg-accent/10",
    iconColor: "text-accent",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is processed locally and not stored. We prioritize your privacy and security.",
    color: "bg-success/10",
    iconColor: "text-success",
  },
  {
    icon: BookOpen,
    title: "Educational Focus",
    description: "Built for learning and understanding, not for medical diagnosis or treatment decisions.",
    color: "bg-secondary",
    iconColor: "text-secondary-foreground",
  },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Layout>
      <div className="hero-gradient">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <FadeIn delay={0}>
              <div className="mb-12 text-center">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl btn-gradient"
                >
                  <BookOpen className="h-7 w-7 text-primary-foreground" />
                </motion.div>
                <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  About SymptoCare
                </h1>
                <p className="mt-3 text-muted-foreground">
                  An educational health assistant powered by machine learning.
                </p>
              </div>
            </FadeIn>

            {/* Main Disclaimer Card */}
            <FadeIn delay={0.1}>
              <motion.div
                initial={{ boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)" }}
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { boxShadow: "0 8px 40px -8px rgba(0,0,0,0.15)", y: -2 }
                }
                transition={{ duration: 0.25 }}
              >
                <Card className="mb-8 border-warning/30 bg-warning/5">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <motion.div
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : { scale: [1, 1.1, 1] }
                        }
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-warning/10"
                      >
                        <AlertTriangle className="h-5 w-5 text-warning" />
                      </motion.div>
                      Important Medical Disclaimer
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">SymptoCare is for educational purposes only.</strong> The information 
                      provided by this application is not intended to be a substitute for professional medical advice, 
                      diagnosis, or treatment.
                    </p>
                    <p>
                      Always seek the advice of your physician or other qualified health provider with any questions 
                      you may have regarding a medical condition. Never disregard professional medical advice or delay 
                      in seeking it because of something you have read or learned from this application.
                    </p>
                    <p>
                      If you think you may have a medical emergency, call your doctor, go to the emergency department, 
                      or call emergency services immediately.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>

            {/* About Section */}
            <FadeIn delay={0.2}>
              <motion.div
                whileHover={
                  prefersReducedMotion
                    ? undefined
                    : { y: -2 }
                }
                transition={{ duration: 0.25 }}
              >
                <Card className="mb-8 shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <motion.div
                        whileHover={prefersReducedMotion ? undefined : { scale: 1.1 }}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
                      >
                        <Heart className="h-5 w-5 text-primary" />
                      </motion.div>
                      What is SymptoCare?
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm text-muted-foreground">
                    <p>
                      SymptoCare is a lightweight medical education application powered by machine learning. 
                      It's designed to help users learn about potential health conditions based on symptoms 
                      and discover information about medicines.
                    </p>
                    <p>
                      Our goal is to make health information more accessible and help people become more 
                      informed about their health, while always emphasizing the importance of professional 
                      medical consultation.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </FadeIn>

            {/* Features Grid */}
            <StaggerContainer staggerDelay={0.1} initialDelay={0.3} className="grid gap-6 md:grid-cols-2">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <StaggerItem key={feature.title}>
                    <AnimatedCard className="h-full">
                      <CardContent className="pt-6">
                        <motion.div
                          whileHover={
                            prefersReducedMotion
                              ? undefined
                              : { scale: 1.1, rotate: 5 }
                          }
                          transition={{ type: "spring", stiffness: 400, damping: 17 }}
                          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}
                        >
                          <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                        </motion.div>
                        <h3 className="font-display font-semibold text-foreground">{feature.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {feature.description}
                        </p>
                      </CardContent>
                    </AnimatedCard>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>

            {/* Final Note */}
            <FadeIn delay={0.6}>
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  SymptoCare is an educational project. For any health concerns, please consult 
                  a qualified healthcare professional.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </Layout>
  );
}
