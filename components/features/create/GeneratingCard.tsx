"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Generation } from "@/types/generation";

interface GeneratingCardProps {
  generation: Generation;
  isLatestActive?: boolean;
}

export default function GeneratingCard({
  generation,
  isLatestActive = false,
}: GeneratingCardProps) {
  let statusText = "Generating";
  if (generation.progress < 20) statusText = "Starting AI audio engine";
  else if (generation.progress < 50) statusText = "Analyzing prompt...";
  else if (generation.progress < 80) statusText = "Mixing audio...";
  else statusText = "Finalizing master...";

  const promptSplitIdx = Math.min(generation.prompt.length, 30);
  const promptShort = generation.prompt.substring(0, promptSplitIdx);
  const promptRest =
    generation.prompt.length > promptSplitIdx
      ? generation.prompt.substring(promptSplitIdx, 45) + "..."
      : "";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={cn(
          "rounded-2xl p-2.5 flex items-center gap-3.5 group transition-colors hover:bg-white/5 cursor-default relative overflow-hidden",
          !isLatestActive && "opacity-50",
        )}
      >
        {/* Progress Background Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 bg-white/5 z-0"
          initial={{ width: "0%" }}
          animate={{ width: `${generation.progress}%` }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        />

        <div className="w-[60px] h-[60px] rounded-[16px] shrink-0 overflow-hidden bg-linear-to-br from-[#1a4a44] to-[#122a3a] z-10">
          <div
            className={cn(
              "absolute top-1.5 left-1.5 w-4 h-4 rounded-full bg-badge-teal",
            )}
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-badge-teal opacity-50 duration-500"></span>
          </div>
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center relative z-10">
          <p
            className={cn(
              "text-[14px] font-semibold leading-relaxed truncate mt-1",
              isLatestActive ? "text-[#888]" : "text-[#666]",
            )}
          >
            {promptShort}{" "}
            <span className={isLatestActive ? "text-[#555]" : "text-[#444]"}>
              {promptRest}
            </span>
          </p>
          <div className="flex items-center justify-between mt-1.5">
            <span
              className={cn(
                "text-[13px] font-medium",
                isLatestActive ? "text-text-muted" : "text-[#555]",
              )}
            >
              {statusText}
            </span>
          </div>
        </div>
        <div
          className={cn(
            "text-xs border border-text-secondary px-2 py-1 rounded-lg text-text-secondary relative z-10",
            isLatestActive ? "text-text-muted" : "text-[#555] opacity-50",
          )}
        >
          {generation.version}
        </div>
      </div>
    </motion.div>
  );
}
