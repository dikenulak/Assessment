"use client";

import { Play, AudioLines, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  InsufficientCreditsAlert,
  ServerBusyAlert,
  InvalidPromptAlert,
} from "./ProfileAlerts";
import { motion, AnimatePresence } from "framer-motion";
import { Generation } from "@/types/generation";
import PlayersSocial from "../player/PlayersSocial";
import GeneratingCard from "../create/GeneratingCard";

interface ProfileGenerationListProps {
  generations: Generation[];
  activeTrack: Generation | null;
  isPlaying: boolean;
  togglePlay: () => void;
  playTrack: (track: Generation) => void;
  removeGeneration: (id: string) => void;
}

export function ProfileGenerationList({
  generations,
  activeTrack,
  isPlaying,
  togglePlay,
  playTrack,
  removeGeneration,
}: ProfileGenerationListProps) {
  const renderGenerationItem = (gen: Generation, index: number) => {
    switch (gen.status) {
      case "failed": {
        let AlertComponent = ServerBusyAlert;
        if (gen.failureReason === "invalid_prompt") {
          AlertComponent = InvalidPromptAlert;
        } else if (gen.failureReason === "insufficient_credits") {
          AlertComponent = InsufficientCreditsAlert;
        }

        return (
          <motion.div
            key={gen.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <AlertComponent onDismiss={() => removeGeneration(gen.id)} />
          </motion.div>
        );
      }

      case "completed": {
        const isCurrentTrack = activeTrack?.id === gen.id;
        const isCurrentPlaying = isCurrentTrack && isPlaying;

        return (
          <motion.div
            key={gen.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0 }}
            className="space-y-1.5 mt-2"
          >
            <div
              className={cn(
                "rounded-[20px] p-2.5 flex items-center gap-3.5 group transition-all hover:bg-bg-hover cursor-pointer",
                isCurrentTrack ? "bg-bg-hover" : "",
              )}
            >
              <div className="w-[60px] h-[60px] rounded-[14px] shrink-0 relative overflow-hidden bg-linear-to-br from-[#204a3f] to-[#193240] flex items-center justify-center">
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white/20 blur-[2px]"></div>
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors z-10"></div>
                <div
                  className={cn(
                    "w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center transition-opacity z-20 duration-500",
                    isCurrentPlaying
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100",
                  )}
                  onClick={() =>
                    isCurrentTrack ? togglePlay() : playTrack(gen)
                  }
                >
                  {isCurrentPlaying ? (
                    <>
                      <AudioLines className="w-4 h-4 text-white group-hover:hidden animate-pulse" />
                      <Pause className="w-4 h-4 text-white fill-white hidden group-hover:block" />
                    </>
                  ) : (
                    <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0 pr-1">
                <p
                  className={cn(
                    "text-[14px] font-bold leading-snug truncate",
                    isCurrentTrack ? "text-white shadow-sm" : "text-[#ddd]",
                  )}
                >
                  {gen.trackTitle || "Untitled Track"}
                </p>
                <div className="flex items-center mt-1">
                  <span
                    className={cn(
                      "text-[13px] font-medium text-text-muted truncate flex-1",
                    )}
                  >
                    {gen.prompt}
                  </span>
                </div>
              </div>
              <div
                className={cn(
                  "items-center gap-2.5 ml-auto relative z-30 transition-all duration-500 hidden group-hover:flex",
                )}
              >
                <PlayersSocial version={gen.version} size="md" />
              </div>
              <div className="text-xs border border-text-secondary px-2 py-1 rounded-lg text-text-secondary font-mono group-hover:hidden">
                {gen.version}
              </div>
            </div>
          </motion.div>
        );
      }

      case "generating":
      case "pending":
      default:
        return (
          <GeneratingCard
            key={gen.id}
            generation={gen}
            isLatestActive={index === 0}
          />
        );
    }
  };

  if (generations.length === 0) {
    return (
      <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
        <div className="text-center py-6 text-text-dark text-sm">
          No recent activity
        </div>
      </div>
    );
  }

  const regularGenerations = generations.filter((g) => g.status !== "failed");
  const failedGenerations = generations.filter((g) => g.status === "failed");
  const sortedGenerations = [...regularGenerations, ...failedGenerations];

  return (
    <div className="space-y-1.5 max-h-[380px] overflow-y-auto custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {sortedGenerations.map(renderGenerationItem)}
      </AnimatePresence>
    </div>
  );
}
