import { Generation } from "@/types/generation";
import { cn } from "@/lib/utils";

interface PlayerTrackInfoProps {
  track: Generation | null;
}

export function PlayerTrackInfo({ track }: PlayerTrackInfoProps) {
  if (!track) return null;

  return (
    <div className="flex items-center gap-4 w-1/3 min-w-[200px]">
      <div
        className={cn(
          "w-14 h-14 rounded-md overflow-hidden bg-linear-to-br from-accent-purple to-accent-pink shrink-0 animate-pulse-slow subpixel-antialiased",
        )}
      >
        {/* Placeholder for artwork using gradient from track if available */}
        {track.thumbnailGradient && (
          <div
            className={`w-full h-full bg-linear-to-br ${track.thumbnailGradient === "gentle" ? "from-blue-400 to-purple-500" : "from-orange-400 to-red-500"}`}
          />
        )}
      </div>
      <div className="min-w-0">
        <h4 className="font-bold text-white truncate text-sm">
          {track.trackTitle || "Untitled Track"}
        </h4>
        <p className="text-xs text-text-secondary truncate font-medium">
          {track.promptShort}
        </p>
      </div>
    </div>
  );
}
