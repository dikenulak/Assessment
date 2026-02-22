import { useRef, useState, useEffect, useCallback } from "react";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const calculatePercent = useCallback((clientX: number) => {
    if (!sliderRef.current) return 0;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    return x / rect.width;
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault(); // Prevent text selection
    setIsDragging(true);
    onChange(calculatePercent(e.clientX));
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      onChange(calculatePercent(e.clientX));
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    }

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isDragging, calculatePercent, onChange]);

  return (
    <div
      ref={sliderRef}
      className={cn(
        "relative h-[12px] flex items-center w-full rounded-full cursor-pointer group select-none touch-none",
        className,
      )}
      onPointerDown={handlePointerDown}
    >
      {/* Background Track */}
      <div className="absolute inset-x-0 h-1 bg-white/10 rounded-full" />
      {/* Buffer bar */}
      {buffer > 0 && (
        <div
          className="absolute left-0 h-1 bg-white/20 rounded-full"
          style={{ width: `${buffer * 100}%` }}
        />
      )}

      {/* Fill bar */}
      <div
        className="absolute left-0 h-1 bg-white rounded-full group-hover:bg-accent-orange transition-colors pointer-events-none"
        style={{ width: `${Math.max(0, Math.min(100, value * 100))}%` }}
      />

      {/* Thumb */}
      <div
        className={cn(
          "absolute h-3 w-3 bg-white rounded-full top-1/2 -translate-y-1/2 shadow-sm pointer-events-none transition-all",
          isDragging
            ? "opacity-100 scale-110"
            : "opacity-0 group-hover:opacity-100 scale-100",
        )}
        style={{
          left: `${Math.max(0, Math.min(100, value * 100))}%`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
