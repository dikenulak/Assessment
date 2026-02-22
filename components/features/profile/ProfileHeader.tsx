import { Settings } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";

export function ProfileHeader() {
  return (
    <div className="px-4 py-5 flex items-start justify-between">
      <div className="flex items-center gap-4">
        {/* Avatar with gradient ring */}
        <div className="relative w-[68px] h-[68px] rounded-full bg-linear-to-br from-[#FF8A00] via-[#FF1493] to-[#9D00FF] p-[3px]">
          <div className="w-full h-full rounded-full bg-bg-card flex items-center justify-center">
            <span className="text-white font-semibold text-2xl">J</span>
          </div>
        </div>
        <div>
          <h2 className="text-white text-[22px] font-bold leading-tight">
            Johnny
          </h2>
          <p className="text-[#666] text-[15px] font-medium">@johnny</p>
        </div>
      </div>
      <IconButton
        icon={<Settings className="w-5 h-5" />}
        label="Settings"
        className="text-[#666] hover:text-white hover:bg-white/5 p-1 h-auto w-auto aspect-square"
      />
    </div>
  );
}
