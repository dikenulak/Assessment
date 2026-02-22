"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PlayerTrackInfo } from "@/components/features/player/PlayerTrackInfo";
import { PlayerControls } from "@/components/features/player/PlayerControls";
import { PlayerProgress } from "@/components/features/player/PlayerProgress";
import { PlayerVolume } from "@/components/features/player/PlayerVolume";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function FloatingPlayer() {
  const {
    audioRef,
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    togglePlay,
    handleSeek,
    handleClose,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
  } = useAudioPlayer();

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <AnimatePresence>
        {activeTrack && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-bg-card/95 backdrop-blur-lg border-t border-white/10 px-6 py-4 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
              <PlayerTrackInfo track={activeTrack} />

              <div className="flex flex-col items-center gap-1 w-1/3 min-w-[300px]">
                <PlayerControls
                  isPlaying={isPlaying}
                  onPlayPause={togglePlay}
                  onNext={() => {}} // TODO: Implement playlist logic
                  onPrevious={() => {}}
                />
                <PlayerProgress
                  currentTime={currentTime}
                  duration={duration}
                  onSeek={handleSeek}
                />
              </div>

              <PlayerVolume
                volume={volume}
                onVolumeChange={setVolume}
                onClose={handleClose}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
