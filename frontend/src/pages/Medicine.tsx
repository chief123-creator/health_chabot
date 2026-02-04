import { useState } from "react";
import { Pill, Search, Image, Loader2 } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload } from "@/components/medicine/FileUpload";
import { MedicineCard } from "@/components/medicine/MedicineCard";
import { ErrorMessage } from "@/components/common/ErrorMessage";
import { FadeIn } from "@/components/motion/FadeIn";
import { SkeletonMedicineCard } from "@/components/ui/skeleton-shimmer";
import { searchMedicineByName, searchMedicineByImage, SearchMedicineResponse } from "@/lib/api";

export default function Medicine() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SearchMedicineResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("name");
  const prefersReducedMotion = useReducedMotion();

  const handleNameSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await searchMedicineByName(searchQuery.trim());
      setResult(response);
    } catch (err) {
      setError(
        "Unable to search medicine. Please make sure the backend server is running at http://localhost:8000"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSearch = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await searchMedicineByImage(file);
      setResult(response);
    } catch (err) {
      setError(
        "Unable to analyze image. Please make sure the backend server is running at http://localhost:8000"
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
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl btn-gradient-accent"
                >
                  <Pill className="h-7 w-7 text-accent-foreground" />
                </motion.div>
                <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                  Medicine Search
                </h1>
                <p className="mt-3 text-muted-foreground">
                  Search for medicines by name or upload an image of a medicine strip.
                </p>
              </div>
            </FadeIn>

            {/* Search Tabs */}
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
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="relative grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="name" className="gap-2 relative z-10">
                      <Search className="h-4 w-4" />
                      Search by Name
                    </TabsTrigger>
                    <TabsTrigger value="image" className="gap-2 relative z-10">
                      <Image className="h-4 w-4" />
                      Search by Image
                    </TabsTrigger>
                  </TabsList>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <TabsContent value="name" className="mt-0">
                        <form onSubmit={handleNameSearch} className="space-y-4">
                          <div className="relative">
                            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                            <Input
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Enter medicine name..."
                              className="h-12 pl-12 text-base shadow-soft focus:shadow-card focus:ring-2 focus:ring-primary/20 transition-all"
                              disabled={isLoading}
                            />
                          </div>
                          <motion.div
                            whileHover={prefersReducedMotion ? undefined : { scale: 1.01 }}
                            whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                          >
                            <Button
                              type="submit"
                              variant="gradient-accent"
                              size="lg"
                              className="w-full"
                              disabled={!searchQuery.trim() || isLoading}
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="h-5 w-5 animate-spin" />
                                  Searching...
                                </>
                              ) : (
                                <>
                                  <Search className="h-5 w-5" />
                                  Search Medicine
                                </>
                              )}
                            </Button>
                          </motion.div>
                        </form>
                      </TabsContent>

                      <TabsContent value="image" className="mt-0">
                        <FileUpload onFileSelect={handleImageSearch} isLoading={isLoading} />
                      </TabsContent>
                    </motion.div>
                  </AnimatePresence>
                </Tabs>
              </motion.div>
            </FadeIn>

            {/* Results Section */}
            <div className="mt-8">
              <AnimatePresence mode="wait">
                {isLoading && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SkeletonMedicineCard />
                  </motion.div>
                )}
                {error && !isLoading && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
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
                {result && !isLoading && (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <MedicineCard
                      medicine={result.medicine}
                      ocrResult={result.ocrResult}
                    />
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
