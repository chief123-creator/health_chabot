import { cn } from "@/lib/utils";

interface SkeletonShimmerProps {
  className?: string;
}

export function SkeletonShimmer({ className }: SkeletonShimmerProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:animate-shimmer",
        className
      )}
    />
  );
}

// Skeleton variants for common use cases
export function SkeletonCard() {
  return (
    <div className="rounded-lg border bg-card p-6 shadow-card">
      <SkeletonShimmer className="mb-4 h-12 w-12 rounded-xl" />
      <SkeletonShimmer className="mb-2 h-5 w-3/4" />
      <SkeletonShimmer className="h-4 w-full" />
      <SkeletonShimmer className="mt-1 h-4 w-2/3" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonShimmer
          key={i}
          className={cn("h-4", i === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </div>
  );
}

export function SkeletonMedicineCard() {
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-card">
      <div className="flex items-start gap-4">
        <SkeletonShimmer className="h-14 w-14 shrink-0 rounded-2xl" />
        <div className="flex-1">
          <SkeletonShimmer className="mb-2 h-6 w-1/2" />
          <SkeletonShimmer className="h-4 w-1/3" />
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <SkeletonShimmer className="h-4 w-full" />
        <SkeletonShimmer className="h-4 w-5/6" />
        <SkeletonShimmer className="h-4 w-4/5" />
      </div>
    </div>
  );
}
