import { Play, Pause, SkipForward, SkipBack, X } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { Button } from "@/components/ui/Button";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  onClose?: () => void; // Added close prop
}

export function PlayerControls({
  isPlaying,
  onPlayPause,
  onNext,
  onPrevious,
  onClose,
}: PlayerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full md:w-1/3 md:min-w-[240px]">
      <div className="flex items-center gap-4 md:gap-6 relative">
        <IconButton
          icon={<SkipBack className="w-5 h-5" />}
          label="Previous track"
          onClick={onPrevious}
          disabled={!onPrevious}
        />

        <button
          onClick={onPlayPause}
          className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-lg focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/50"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>

        <IconButton
          icon={<SkipForward className="w-5 h-5" />}
          label="Next track"
          onClick={onNext}
          disabled={!onNext}
        />
      </div>
    </div>
  );
}
