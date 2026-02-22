"use client";

import { motion } from "framer-motion";
import { Play, Pause, AudioLines } from "lucide-react";
import { Generation } from "@/types/generation";
import { useGenerationStore } from "@/store/useGenerationStore";
import { cn } from "@/lib/utils";
import Image from "next/image";
import PlayersSocial from "../player/PlayersSocial";

interface GenerationCardProps {
  generation: Generation;
}

export default function GenerationCard({ generation }: GenerationCardProps) {
  const { status, prompt, trackTitle, version } = generation;
  const playTrack = useGenerationStore((state) => state.playTrack);
  const togglePlay = useGenerationStore((state) => state.togglePlay);
  const activeTrack = useGenerationStore((state) => state.activeTrack);
  const isPlaying = useGenerationStore((state) => state.isPlaying);

  const isCurrentTrack = activeTrack?.id === generation.id;
  const isCurrentPlaying = isCurrentTrack && isPlaying;

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (status !== "completed") return;

    if (isCurrentTrack) {
      togglePlay();
    } else {
      playTrack(generation);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative px-2 py-2.5 rounded-2xl transition-all duration-500 hover:bg-[#1A1A1A] max-w-3xl"
    >
      <div className="flex items-center gap-4 relative z-10">
        {/* Thumbnail / Play Button */}
        <div
          onClick={handlePlayClick}
          className={cn(
            `w-15 h-15 rounded-2xl bg-linear-to-br from-gray-700 to-gray-900 fshrink-0 relative overflow-hidden group-hover:scale-105 transition-transform`,
            status === "completed" ? "cursor-pointer" : "cursor-default",
          )}
        >
          {/* Simple placeholder image or gradient */}
          <Image
            src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=100&q=80"
            alt="Track thumbnail"
            fill
            className="object-cover opacity-80"
            sizes="60px"
          />

          {/* Overlay Play Button on Hover */}
          {status === "completed" && (
            <div
              className={`absolute inset-0 flex items-center justify-center transition-colors ${isCurrentPlaying ? "bg-black/50" : "bg-black/30 opacity-0 group-hover:opacity-100"}`}
            >
              <div className="w-8 h-8 rounded-full bg-white/5 backdrop-blur-md flex items-center justify-center">
                {isCurrentPlaying ? (
                  <>
                    <AudioLines className="w-4 h-4 text-white group-hover:hidden" />
                    <Pause className="w-4 h-4 text-white fill-white hidden group-hover:block" />
                  </>
                ) : (
                  <Play className="w-4 h-4 text-white fill-white ml-0.5 relative z-10" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="flex-1 min-w-0 flex flex-col">
          <h4 className="text-white font-medium">
            {trackTitle || "Untitled Track"}
          </h4>
          <p className="text-text-muted text-sm group-hover:text-[#AAA] truncate">
            {prompt}
          </p>
        </div>

        {/* Actions (Only visible on hover) */}
        <div
          className={cn(
            "transition-opacity",
            isCurrentTrack
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100",
          )}
        >
          <div className="absolute top-4 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pr-2 pb-2 bg-linear-to-l from-bg-card to-bg-card/70 duration-500">
            <PlayersSocial version={version} size="md" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
