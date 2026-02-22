"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useGenerationStore } from "@/store/useGenerationStore";
import { Generation } from "@/types/generation";
import GenerationCard from "./GenerationCard";
import GeneratingCard from "./GeneratingCard";
import GenerationSkeleton from "./GenerationSkeleton";
import { Music } from "lucide-react";

export default function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Artificial small delay to show skeleton if needed, or simply wait for hydration
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Filter out failed generations as per user request
  const visibleGenerations = generations.filter(
    (gen) => gen.status !== "failed",
  );

  const renderGenerationItem = (gen: Generation, i: number) => {
    switch (gen.status) {
      case "completed":
        return <GenerationCard key={gen.id} generation={gen} />;
      case "generating":
      case "pending":
      default:
        return (
          <GeneratingCard
            key={gen.id}
            generation={gen}
            isLatestActive={i === 0}
          />
        );
    }
  };

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-text-secondary">
          Recent generations
        </h2>
        <div className="grid gap-3">
          <GenerationSkeleton />
          <GenerationSkeleton />
        </div>
      </div>
    );
  }

  if (visibleGenerations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center opacity-50">
        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Music className="w-8 h-8 text-white/50" />
        </div>
        <h3 className="text-lg font-medium text-white mb-2">
          Start Creating Music
        </h3>
        <p className="text-text-muted max-w-sm">
          Enter a prompt above to generate your first track.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-text-secondary">
        Recent generations
      </h2>
      <div className="grid gap-3">
        <AnimatePresence initial={false} mode="popLayout">
          {visibleGenerations.map(renderGenerationItem)}
        </AnimatePresence>
      </div>
    </div>
  );
}
