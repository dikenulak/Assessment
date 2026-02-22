"use client";

import {
  Play,
  Pause,
  Download,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  InsufficientCreditsAlert,
  ServerBusyAlert,
  InvalidPromptAlert,
} from "./ProfileAlerts";
import { motion, AnimatePresence } from "framer-motion";
import { Generation } from "@/types/generation";

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
  if (generations.length === 0) {
    return (
      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1 custom-scrollbar">
        <div className="text-center py-6 text-text-dark text-sm">
          No recent activity
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-2 pb-4 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {generations.map((gen, index) => {
          if (gen.status === "failed") {
            if (gen.failureReason === "invalid_prompt") {
              return (
                <motion.div
                  key={gen.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <InvalidPromptAlert
                    onDismiss={() => removeGeneration(gen.id)}
                  />
                </motion.div>
              );
            }
            if (gen.failureReason === "insufficient_credits") {
              return (
                <motion.div
                  key={gen.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <InsufficientCreditsAlert
                    onDismiss={() => removeGeneration(gen.id)}
                  />
                </motion.div>
              );
            }
            return (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ServerBusyAlert onDismiss={() => removeGeneration(gen.id)} />
              </motion.div>
            );
          }

          if (gen.status === "completed") {
            const isCurrentTrack = activeTrack?.id === gen.id;
            const isCurrentPlaying = isCurrentTrack && isPlaying;

            return (
              <motion.div
                key={gen.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-1.5 mt-2"
              >
                <div
                  onClick={() =>
                    isCurrentTrack ? togglePlay() : playTrack(gen)
                  }
                  className={cn(
                    "rounded-[20px] p-2.5 flex items-center gap-3.5 group transition-all hover:bg-bg-card cursor-pointer",
                    isCurrentTrack ? "bg-bg-hover" : "",
                  )}
                >
                  <div className="w-[60px] h-[60px] rounded-[14px] shrink-0 relative overflow-hidden bg-linear-to-br from-[#204a3f] to-[#193240] flex items-center justify-center">
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white/20 blur-[2px]"></div>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors z-10"></div>
                    {isCurrentPlaying ? (
                      <Pause className="w-5 h-5 text-white fill-white z-20" />
                    ) : (
                      <Play className="w-5 h-5 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
                    )}
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
                          "text-[13px] font-medium text-text-muted truncate",
                          isCurrentTrack ? "w-[90px]" : "flex-1",
                        )}
                      >
                        {gen.prompt}
                      </span>
                      {isCurrentTrack ? (
                        <div className="flex items-center gap-2.5 ml-auto relative z-30">
                          <button
                            className="text-white hover:scale-110 transition-transform"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ThumbsUp className="w-[18px] h-[18px] fill-white" />
                          </button>
                          <button
                            className="text-[#666] hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ThumbsDown className="w-[18px] h-[18px]" />
                          </button>
                          <span className="text-text-muted text-[11px] font-bold border border-[#444] px-1.5 py-0.5 rounded-md mx-0.5">
                            {gen.version}
                          </span>
                          <button
                            className="text-[#777] hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download className="w-[18px] h-[18px]" />
                          </button>
                          <button
                            className="text-[#777] hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-[18px] h-[18px]" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-text-muted text-[11px] font-bold border border-border-medium px-1.5 py-0.5 rounded-md ml-2 shrink-0">
                          {gen.version}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          }

          // Generating or pending
          let statusText = "Generating";
          if (gen.progress < 20) statusText = "Starting AI audio engine";
          else if (gen.progress < 50) statusText = "Analyzing prompt...";
          else if (gen.progress < 80) statusText = "Mixing audio...";
          else statusText = "Finalizing master...";

          const promptSplitIdx = Math.min(gen.prompt.length, 30);
          const promptShort = gen.prompt.substring(0, promptSplitIdx);
          const promptRest =
            gen.prompt.length > promptSplitIdx
              ? gen.prompt.substring(promptSplitIdx, 45) + "..."
              : "";

          // The most recent actively generating item should be fully opaque, older ones slightly transparent
          const isLatestActive = index === 0;

          return (
            <motion.div
              key={gen.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className={cn(
                  "rounded-2xl p-2.5 flex items-center gap-3.5 group transition-colors hover:bg-white/5 cursor-default relative",
                  !isLatestActive && "opacity-50",
                )}
              >
                <div className="w-[60px] h-[60px] rounded-[16px] shrink-0 relative overflow-hidden bg-linear-to-br from-[#1a4a44] to-[#122a3a]">
                  <div
                    className={cn(
                      "absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#4ade80]",
                      isLatestActive
                        ? "shadow-[0_0_8px_#4ade80] animate-pulse"
                        : "shadow-[0_0_8px_#4ade80]",
                    )}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={cn(
                      "text-[14px] font-semibold leading-relaxed truncate",
                      isLatestActive ? "text-[#888]" : "text-[#666]",
                    )}
                  >
                    {promptShort}{" "}
                    <span
                      className={isLatestActive ? "text-[#555]" : "text-[#444]"}
                    >
                      {promptRest}
                    </span>
                  </p>
                  <div className="flex items-center justify-between mt-0.5">
                    <span
                      className={cn(
                        "text-[13px] font-medium",
                        isLatestActive ? "text-text-muted" : "text-[#555]",
                      )}
                    >
                      {statusText}
                    </span>
                    <span
                      className={cn(
                        "text-[11px] font-bold border border-border-medium px-1.5 py-0.5 rounded-md",
                        isLatestActive
                          ? "text-text-muted"
                          : "text-[#555] opacity-50",
                      )}
                    >
                      {gen.version}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
