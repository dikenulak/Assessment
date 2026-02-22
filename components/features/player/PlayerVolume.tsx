import { Volume2, VolumeX, Maximize2, X } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { IconButton } from "@/components/ui/IconButton";
import { useState } from "react";

interface PlayerVolumeProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
  onClose?: () => void;
}

export function PlayerVolume({
  volume,
  onVolumeChange,
  onClose,
}: PlayerVolumeProps) {
  const [lastVolume, setLastVolume] = useState(volume);
  const isMuted = volume === 0;

  const toggleMute = () => {
    if (isMuted) {
      onVolumeChange(lastVolume || 0.7);
    } else {
      setLastVolume(volume);
      onVolumeChange(0);
    }
  };

  return (
    <div className="flex items-center justify-end gap-4 w-1/3 min-w-[200px]">
      <div className="flex items-center gap-2 group">
        <button
          onClick={toggleMute}
          className="text-text-secondary hover:text-white transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>

        <div className="w-24">
          <Slider value={volume} onChange={onVolumeChange} />
        </div>
      </div>

      <div className="flex items-center gap-1 border-l border-white/10 pl-4 ml-2">
        <IconButton
          icon={<Maximize2 className="w-4 h-4" />}
          label="Expand"
          className="hover:bg-white/10"
        />
        {onClose && (
          <IconButton
            icon={<X className="w-4 h-4" />}
            label="Close Player"
            onClick={onClose}
            className="hover:bg-red-500/20 hover:text-red-500"
          />
        )}
      </div>
    </div>
  );
}
