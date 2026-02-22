import { useRef, MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SliderProps {
  value: number; // 0 to 1
  onChange: (value: number) => void;
  className?: string;
  buffer?: number; // 0 to 1, for buffered progress
}

export function Slider({
  value,
  onChange,
  className,
  buffer = 0,
}: SliderProps) {
  const handleInteraction = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percent = x / rect.width;
    onChange(percent);
  };

  return (
    <div
      className={cn(
        "relative h-1 w-full bg-white/10 rounded-full cursor-pointer group select-none touch-none",
        className,
      )}
      onClick={handleInteraction}
    >
      {/* Buffer bar */}
      {buffer > 0 && (
        <div
          className="absolute h-full bg-white/10 rounded-full"
          style={{ width: `${buffer * 100}%` }}
        />
      )}

      {/* Fill bar */}
      <div
        className="absolute h-full bg-white rounded-full group-hover:bg-accent-orange transition-colors"
        style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }}
      />

      {/* Thumb (optional, visible on hover often in modern players) */}
      <div
        className="absolute h-3 w-3 bg-white rounded-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
        style={{
          left: `${Math.max(0, Math.min(100, value * 100))}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
