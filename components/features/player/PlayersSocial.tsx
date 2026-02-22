import { IconButton } from "@/components/ui/IconButton";
import { ThumbsDown, ThumbsUp, MoreHorizontal } from "lucide-react";

interface PlayersSocialProps {
  version: string;
  size?: "sm" | "md" | "lg";
}

const PlayersSocial = ({ version, size = "md" }: PlayersSocialProps) => {
  const iconSize = size === "sm" ? 5 : size === "md" ? 7 : 10;
  return (
    <div className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 pr-2 bg-linear-to-l from-bg-card to-bg-card/70 py-5 duration-500">
      <div className="flex items-center gap-5">
        <IconButton
          icon={<ThumbsUp className={`w-${iconSize} h-${iconSize}`} />}
          label="Like"
          className={`w-${iconSize} h-${iconSize} hover:bg-white/10 text-[#666] hover:text-white`}
        />
        <IconButton
          icon={<ThumbsDown className={`w-${iconSize} h-${iconSize}`} />}
          label="Dislike"
          className={`w-${iconSize} h-${iconSize} hover:bg-white/10 text-[#666] hover:text-white`}
        />

        <div className="text-sm border border-text-secondary px-3 py-1 rounded-xl text-text-secondary font-mono">
          {version}
        </div>

        <IconButton
          icon={<MoreHorizontal className={`w-${iconSize} h-${iconSize}`} />}
          label="More options"
          className={`w-${iconSize} h-${iconSize} hover:bg-white/10 text-[#666]`}
        />
      </div>
    </div>
  );
};

export default PlayersSocial;
