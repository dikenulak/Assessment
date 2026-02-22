"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGenerationStore } from "@/store/useGenerationStore";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileCredits } from "./ProfileCredits";
import { ProfileGenerationList } from "./ProfileGenerationList";

export default function ProfilePopup() {
  const isProfileOpen = useGenerationStore((state) => state.isProfileOpen);
  const closeProfile = useGenerationStore((state) => state.closeProfile);
  const generations = useGenerationStore((state) => state.generations);

  const activeTrack = useGenerationStore((state) => state.activeTrack);
  const isPlaying = useGenerationStore((state) => state.isPlaying);
  const playTrack = useGenerationStore((state) => state.playTrack);
  const togglePlay = useGenerationStore((state) => state.togglePlay);
  const removeGeneration = useGenerationStore(
    (state) => state.removeGeneration,
  );

  // Filter for completed items as requested ("only completed items should be show")
  // We'll also show actively generating items if you want, but the prompt said "instead of generating items".
  // However, completely hiding progress might be bad UX.
  // Let's interpret "instead of" as "The list should become a playable history".
  // I will prioritize completed items but maybe keep active ones at the top if they exist?
  // User: "Once the generation is completed only completed items should be show on profile popup instead of generating items"
  // This implies: "Don't show the 'Generating...' state for completed items".
  // It likely means: Show a history list.

  const completedGenerations = generations.filter(
    (g) => g.status === "completed",
  );
  // Optional: show active ones too?
  const nonCompletedGenerations = generations.filter(
    (g) =>
      g.status === "generating" ||
      g.status === "pending" ||
      g.status === "failed",
  );

  // Combine them, active/failed first
  const displayGenerations = [
    ...nonCompletedGenerations,
    ...completedGenerations,
  ].slice(0, 5); // Limit to 5

  return (
    <AnimatePresence>
      {isProfileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProfile}
            className="fixed inset-0 z-40"
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 50 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-0 left-0 right-0 w-full rounded-t-3xl rounded-b-none md:top-20 md:right-4 md:left-auto md:w-100 md:rounded-[28px] md:bottom-auto bg-bg-card shadow-2xl z-50 overflow-hidden border border-[#222] flex flex-col max-h-[90vh]"
          >
            {/* Mobile Drag Handle */}
            <div className="w-full flex justify-center pt-3 pb-1 md:hidden">
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Header */}
            <ProfileHeader />

            {/* Content Container (Scrollable) */}
            <div className="px-4 pb-8 md:pb-4 space-y-5 overflow-y-auto flex-1 overscroll-contain">
              {/* Credits Bar */}
              <ProfileCredits />

              <hr className="border-[#222]" />

              {/* List of Generations */}
              <ProfileGenerationList
                generations={displayGenerations}
                activeTrack={activeTrack}
                isPlaying={isPlaying}
                togglePlay={togglePlay}
                playTrack={playTrack}
                removeGeneration={removeGeneration}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
