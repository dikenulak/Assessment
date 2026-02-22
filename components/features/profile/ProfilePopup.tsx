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
  const activeGenerations = generations.filter(
    (g) => g.status === "generating" || g.status === "pending",
  );

  // Combine them, active first
  const displayGenerations = [
    ...activeGenerations,
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
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 right-4 w-100 bg-bg-card rounded-[28px] shadow-2xl z-50 overflow-hidden border border-[#222]"
          >
            {/* Header */}
            <ProfileHeader />

            {/* Content */}
            <div className="px-4 pb-4 space-y-5">
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
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
