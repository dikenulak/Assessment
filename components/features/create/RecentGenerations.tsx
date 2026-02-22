"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGenerationStore } from "@/store/useGenerationStore";
import GenerationCard from "./GenerationCard";
import { Music } from "lucide-react";

export default function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations);

  if (generations.length === 0) {
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
          {generations.map((gen, i) => (
            <GenerationCard key={gen.id} generation={gen} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
