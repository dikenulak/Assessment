"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";
import { useGenerationStore } from "@/store/useGenerationStore";
import { AnimatedBorder } from "@/components/shared/AnimatedBorder";
import { cn } from "@/lib/utils";
import { getSocket } from "@/lib/socket";
import { useCyclingPlaceholder } from "@/hooks/useCyclingPlaceholder";
import { PromptToolbar } from "./PromptToolbar";
import { PromptLyricsInput } from "./PromptLyricsInput";

export default function PromptBox() {
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [showLyrics, setShowLyrics] = useState(false);
  const [remixMode, setRemixMode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addGeneration = useGenerationStore((state) => state.addGeneration);
  const cyclingPlaceholder = useCyclingPlaceholder();

  const handleSubmit = async () => {
    if (!prompt.trim() || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const id = addGeneration(prompt);

      if (!id) {
        setIsSubmitting(false);
        return;
      }

      // Join the WebSocket room for this generation
      const socket = getSocket();
      if (socket.emit) {
        socket.emit("join_generation", id);
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, id }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        console.error("Generation API error:", data.error ?? res.status);
        setIsSubmitting(false);
        return;
      }

      setTimeout(() => {
        setPrompt("");
        setIsSubmitting(false);
      }, 200);
    } catch (error) {
      console.error("Submission failed", error);
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative group">
      {/* Outer glow — only when focused */}
      <div
        className={cn(
          "absolute -inset-1 rounded-4xl blur-3xl transition-all duration-500",
          "bg-linear-to-r from-[#fc7912] via-[#ff9a44] to-[#fc7912]",
          isFocused ? "opacity-40 scale-[1.02]" : "opacity-0 scale-100",
        )}
      />

      <div
        className={cn(
          "relative bg-bg-card rounded-4xl border transition-all duration-300 flex flex-col justify-between",
          isFocused ? "border-accent-orange/40" : "border-border-input",
        )}
        style={{ minHeight: "130px" }}
      >
        {/* Circulating border animation — on by default, off when focused */}
        <AnimatedBorder active={!isFocused} />

        <div className="p-4 relative flex-1 flex flex-col">
          {/* Textarea area */}
          <div className="relative flex-1 min-h-[40px]">
            {/* Animated cycling placeholder */}
            {!prompt && !isFocused && (
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cyclingPlaceholder}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute text-text-muted text-base font-normal select-none"
                  >
                    {cyclingPlaceholder}
                  </motion.span>
                </AnimatePresence>
              </div>
            )}

            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              aria-label="Describe your song"
              aria-describedby="prompt-hint"
              onKeyDown={handleKeyDown}
              placeholder=""
              className="w-full h-full bg-transparent text-white text-base font-medium placeholder-transparent resize-none focus:outline-none z-10 relative"
              spellCheck={false}
            />
            <span id="prompt-hint" className="sr-only">
              Press Enter to submit. Use Shift+Enter for a new line.
            </span>
          </div>

          {/* Lyrics Section */}
          <PromptLyricsInput
            showLyrics={showLyrics}
            lyrics={lyrics}
            setLyrics={setLyrics}
          />

          {/* Remix Indicator */}
          <AnimatePresence>
            {remixMode && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="text-xs text-accent-orange font-medium flex items-center gap-1 mb-1">
                  <Shuffle className="w-3 h-3" />
                  Remix Mode Active
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toolbar */}
          <PromptToolbar
            prompt={prompt}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            fileInputRef={fileInputRef}
            remixMode={remixMode}
            setRemixMode={setRemixMode}
            showLyrics={showLyrics}
            setShowLyrics={setShowLyrics}
          />
        </div>
      </div>

      {/* Footer Text below box */}
      <div className="flex items-center justify-center gap-4 mt-6 text-[11px] text-[#FFFFFF40]">
        <span>MusicGPT v6 Pro - Our latest AI audio model</span>
        <a href="#" className="underline hover:text-icon-muted">
          Example prompts
        </a>
      </div>
    </div>
  );
}
