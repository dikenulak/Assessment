import { Slider } from "@/components/ui/Slider";

interface PlayerProgressProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

export function PlayerProgress({
  currentTime,
  duration,
  onSeek,
}: PlayerProgressProps) {
  const progress = duration > 0 ? currentTime / duration : 0;

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (value: number) => {
    onSeek(value * duration);
  };

  return (
    <div className="w-full max-w-md flex items-center gap-3">
      <span className="text-xs text-text-muted font-mono min-w-[40px] text-right">
        {formatTime(currentTime)}
      </span>

      <div className="flex-1 relative group py-2">
        {" "}
        {/* Added vertical padding for easier clicking */}
        <Slider
          value={progress}
          onChange={handleSeek}
          className="h-1 bg-white/20"
        />
      </div>

      <span className="text-xs text-text-muted font-mono min-w-[40px]">
        {formatTime(duration)}
      </span>
    </div>
  );
}
