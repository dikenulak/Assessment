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
            initial={{ y: "200%" }}
            animate={{ y: 0 }}
            exit={{ y: "200%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-4 left-1/2 md:left-[calc(50%+100px)] -translate-x-1/2 w-[calc(100%-2rem)] max-w-3xl z-50 bg-bg-card/95 backdrop-blur-xl border border-white/10 px-4 md:px-6 py-3 shadow-2xl rounded-2xl md:rounded-[24px]"
          >
            <div className="flex items-center justify-between gap-2 md:gap-4">
              <PlayerTrackInfo track={activeTrack} />

              <div className="flex flex-col items-center gap-1 w-full max-w-[200px] md:max-w-none md:w-1/3 min-w-[150px] md:min-w-[300px]">
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

              <div className="hidden md:flex w-[200px] justify-end">
                <PlayerVolume
                  volume={volume}
                  onVolumeChange={setVolume}
                  onClose={handleClose}
                />
              </div>

              {/* Mobile Close Button */}
              <div className="md:hidden">
                <button
                  onClick={handleClose}
                  className="p-2 text-text-muted hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
