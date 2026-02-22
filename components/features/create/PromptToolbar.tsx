"use client";

import { RefObject } from "react";
import {
  Paperclip,
  Settings2,
  AudioLines,
  Plus,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils";

interface PromptToolbarProps {
  prompt: string;
  isSubmitting: boolean;
  handleSubmit: () => void;
  fileInputRef: RefObject<HTMLInputElement | null>;
  remixMode: boolean;
  setRemixMode: (val: boolean) => void;
  showLyrics: boolean;
  setShowLyrics: (val: boolean) => void;
}

export function PromptToolbar({
  prompt,
  isSubmitting,
  handleSubmit,
  fileInputRef,
  remixMode,
  setRemixMode,
  showLyrics,
  setShowLyrics,
}: PromptToolbarProps) {
  return (
    <div className="flex items-center justify-between mt-3 pt-0 relative z-20">
      <div className="flex items-center gap-2">
        {/* Attach */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-10 h-10 flex items-center justify-center rounded-full text-icon-muted hover:text-white border border-border-medium hover:border-border-focus hover:bg-white/5 transition-all"
          aria-label="Attach file"
        >
          <Paperclip className="w-5 h-5 text-white" aria-hidden="true" />
        </button>

        {/* Remix / Sliders */}
        <button
          onClick={() => setRemixMode(!remixMode)}
          className={cn(
            "w-10 h-10 flex items-center justify-center rounded-full transition-all border",
            remixMode
              ? "text-accent-orange bg-accent-orange/10 border-accent-orange/30"
              : "text-white hover:text-white border-border-medium hover:border-border-focus hover:bg-white/5",
          )}
          aria-label={remixMode ? "Disable remix mode" : "Enable remix mode"}
          aria-pressed={remixMode}
        >
          <Settings2 className="w-5 h-5" />
        </button>

        {/* Audio / Waveform */}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:text-white border border-border-medium hover:border-border-focus hover:bg-white/5 transition-all"
          title="Audio"
        >
          <AudioLines className="w-5 h-5" />
        </button>

        {/* Lyrics Button */}
        <button
          onClick={() => setShowLyrics(!showLyrics)}
          className={cn(
            "flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-semibold transition-all border",
            showLyrics
              ? "bg-white/10 text-white border-border-focus"
              : "text-white hover:text-white border-border-medium hover:border-border-focus hover:bg-white/5",
          )}
        >
          <Plus className="w-3.5 h-3.5" />
          Lyrics
        </button>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Tools Dropdown */}
        <button className="flex items-center gap-2 h-10 px-5 bg-bg-hover rounded-full text-sm font-semibold text-white hover:bg-border-medium transition-colors border border-border-medium hover:border-border-dark">
          Tools
          <ChevronDown className="w-4 h-4 text-white" />
        </button>

        {/* Submit Arrow */}
        <IconButton
          icon={<ArrowRight className="w-5 h-5" />}
          label="Submit prompt"
          onClick={handleSubmit}
          disabled={!prompt.trim() || isSubmitting}
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 border",
            prompt.trim() && !isSubmitting
              ? "bg-border-dark text-white border-border-focus hover:bg-white hover:text-black hover:border-white shadow-lg"
              : "bg-bg-hover text-text-dark border-border-medium cursor-not-allowed",
          )}
        />
      </div>
    </div>
  );
}
