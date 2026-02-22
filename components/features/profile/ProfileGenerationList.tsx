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
}

export function ProfileGenerationList({
  generations,
  activeTrack,
  isPlaying,
  togglePlay,
  playTrack,
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
        <motion.div
          key={"insufficient-credits"}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          {/* Insufficient Credits Alert */}
          <InsufficientCreditsAlert />
        </motion.div>

        <motion.div
          key={"generating-1"}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          {/* Generating 1 */}
          <div className="rounded-2xl p-2.5 flex items-center gap-3.5 group transition-colors hover:bg-white/5 cursor-default relative">
            <div className="w-[60px] h-[60px] rounded-[16px] shrink-0 relative overflow-hidden bg-linear-to-br from-[#1a4a44] to-[#122a3a]">
              <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80] animate-pulse"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#888] text-[14px] font-semibold leading-relaxed truncate">
                Create a funky house song{" "}
                <span className="text-[#555]">with female v...</span>
              </p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[13px] font-medium text-text-muted">
                  Generating
                </span>
                <span className="text-text-muted text-[11px] font-bold border border-border-medium px-1.5 py-0.5 rounded-md">
                  v1
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          key={"generating-2"}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.15 }}
        >
          {/* Generating 2 */}
          <div className="rounded-2xl p-2.5 flex items-center gap-3.5 group transition-colors hover:bg-white/5 cursor-default relative -mt-1 opacity-50">
            <div className="w-[60px] h-[60px] rounded-[16px] shrink-0 relative overflow-hidden bg-linear-to-br from-[#1a4a44] to-[#122a3a]">
              <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full bg-[#4ade80] shadow-[0_0_8px_#4ade80]"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[#666] text-[14px] font-semibold leading-relaxed truncate">
                Create a funky house song{" "}
                <span className="text-[#444]">with f...</span>
              </p>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[13px] font-medium text-[#555]">
                  Starting AI audio engine
                </span>
                <span className="text-[#555] opacity-50 text-[11px] font-bold border border-border-medium px-1.5 py-0.5 rounded-md">
                  v2
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          key={"server-busy"}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <ServerBusyAlert />
        </motion.div>

        <motion.div
          key={"invalid-prompt"}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2, delay: 0.25 }}
        >
          <InvalidPromptAlert />
        </motion.div>
      </AnimatePresence>

      <motion.div
        key={"completed-1"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="space-y-1.5"
      >
        {/* Completed 1 */}
        <div className="rounded-[20px] p-2.5 flex items-center gap-3.5 group transition-all hover:bg-bg-card cursor-pointer mt-4">
          <div className="w-[60px] h-[60px] rounded-[14px] shrink-0 relative overflow-hidden bg-linear-to-br from-[#204a3f] to-[#193240] flex items-center justify-center">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white/20 blur-[2px]"></div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors z-10"></div>
            <Play className="w-5 h-5 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-[#ddd] text-[14px] font-bold leading-snug truncate">
              Out in the street
            </p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[13px] font-medium text-text-muted truncate">
                Christmas song with the title "Mo...
              </span>
              <span className="text-text-muted text-[11px] font-bold border border-border-medium px-1.5 py-0.5 rounded-md ml-2 shrink-0">
                v1
              </span>
            </div>
          </div>
        </div>

        {/* Completed 2 (Hover/Active Example) */}
        <div className="rounded-[20px] p-2.5 flex items-center gap-3.5 bg-bg-hover cursor-pointer -mt-1 relative">
          <div className="w-[60px] h-[60px] rounded-[14px] shrink-0 relative overflow-hidden bg-linear-to-br from-[#204a3f] to-[#193240] flex items-center justify-center">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white/20 blur-[2px]"></div>
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <Play className="w-6 h-6 text-white fill-white z-20" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[14px] font-bold leading-snug truncate shadow-sm">
              I bet my life
            </p>
            <div className="flex items-center mt-1">
              <span className="text-[13px] font-medium text-text-muted truncate w-[90px]">
                Christmas...
              </span>
              <div className="flex items-center gap-2.5 ml-auto">
                <button className="text-white hover:scale-110 transition-transform">
                  <ThumbsUp className="w-[18px] h-[18px] fill-white" />
                </button>
                <button className="text-[#666] hover:text-white transition-colors">
                  <ThumbsDown className="w-[18px] h-[18px]" />
                </button>
                <span className="text-text-muted text-[11px] font-bold border border-[#444] px-1.5 py-0.5 rounded-md mx-0.5">
                  v1
                </span>
                <button className="text-[#777] hover:text-white transition-colors">
                  <Download className="w-[18px] h-[18px]" />
                </button>
                <button className="text-[#777] hover:text-white transition-colors">
                  <MoreHorizontal className="w-[18px] h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Completed 3 */}
        <div className="rounded-[20px] p-2.5 flex items-center gap-3.5 group transition-all hover:bg-bg-card cursor-pointer -mt-1">
          <div className="w-[60px] h-[60px] rounded-[14px] shrink-0 relative overflow-hidden bg-linear-to-br from-[#204a3f] to-[#193240] flex items-center justify-center">
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-white/20 blur-[2px]"></div>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors z-10"></div>
            <Play className="w-5 h-5 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity z-20" />
          </div>
          <div className="flex-1 min-w-0 pr-1">
            <p className="text-[#ddd] text-[14px] font-bold leading-snug truncate">
              Good Morning in the rain of nove...
            </p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[13px] font-medium text-text-muted truncate">
                Christmas song with the title "Mo...
              </span>
              <span className="text-text-muted text-[11px] font-bold border border-border-medium px-1.5 py-0.5 rounded-md ml-2 shrink-0">
                v1
              </span>
            </div>
          </div>
        </div>

        {/* Skeleton loading at bottom */}
        <div className="rounded-[20px] p-2.5 flex items-center gap-3.5 mt-2 opacity-10">
          <div className="w-[60px] h-[60px] rounded-[14px] bg-[#333]"></div>
          <div className="flex-1 space-y-2.5">
            <div className="h-3 bg-[#444] rounded w-24"></div>
            <div className="h-2.5 bg-[#333] rounded w-40"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
