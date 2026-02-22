"use client";

import { Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useGenerationStore } from "@/store/useGenerationStore";

export function ProfileCredits() {
  const credits = useGenerationStore((state) => state.credits);
  const setCredits = useGenerationStore((state) => state.setCredits);

  return (
    <div className="bg-bg-surface rounded-[18px] px-5 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-white text-[15px] font-bold">
          {credits}/600 credits
        </span>
        <Info className="w-4 h-4 text-text-dark" />
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="flex items-center gap-1 text-text-subtle hover:text-white text-[14px] font-semibold h-auto p-0 hover:bg-transparent"
        onClick={() => setCredits(600)}
        title="Reset credits to 600 for testing"
      >
        Top Up
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
