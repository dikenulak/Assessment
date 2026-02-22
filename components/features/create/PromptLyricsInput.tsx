"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PromptLyricsInputProps {
  showLyrics: boolean;
  lyrics: string;
  setLyrics: (val: string) => void;
}

export function PromptLyricsInput({
  showLyrics,
  lyrics,
  setLyrics,
}: PromptLyricsInputProps) {
  return (
    <AnimatePresence>
      {showLyrics && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="overflow-hidden mb-2"
        >
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            placeholder="Type lyrics here..."
            className="w-full bg-white/5 rounded-lg p-3 text-sm text-white placeholder-white/30 focus:outline-none focus:bg-white/10 transition-colors min-h-[80px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
