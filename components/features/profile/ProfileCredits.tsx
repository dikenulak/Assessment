import { Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ProfileCredits() {
  return (
    <div className="bg-bg-surface rounded-[18px] px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-white text-[15px] font-bold">
          120/500 credits
        </span>
        <Info className="w-4 h-4 text-text-dark" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 text-text-subtle hover:text-white text-[14px] font-semibold h-auto p-0 hover:bg-transparent"
      >
        Top Up
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
