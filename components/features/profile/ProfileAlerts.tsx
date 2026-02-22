"use client";

import { AlertTriangle, X } from "lucide-react";

export function InsufficientCreditsAlert({
  onDismiss,
}: {
  onDismiss?: () => void;
}) {
  return (
    <div className="rounded-2xl bg-[#1c1c1c] p-4 flex items-center justify-between relative mt-2 mb-2">
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 text-[#555] hover:text-[#888] transition-colors rounded-full bg-[#111] p-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="flex items-start gap-2.5 flex-1 pr-8">
        <AlertTriangle className="w-[18px] h-[18px] text-accent-yellow shrink-0 mt-0.5" />
        <div>
          <h4 className="text-accent-yellow text-sm font-semibold">
            Insufficient credits
          </h4>
          <p className="text-[#aaa] text-[13px] mt-0.5">
            Your credit balance : 0
          </p>
        </div>
      </div>
      <button className="h-8 px-4 border border-[#444] rounded-full text-white text-[13px] font-semibold hover:bg-white/5 transition-colors shrink-0">
        Top Up
      </button>
    </div>
  );
}

export function ServerBusyAlert({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div className="rounded-xl bg-[#381a1a] p-3.5 mt-2 mb-2">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-[18px] h-[18px] text-[#ef4444]" />
          <span className="text-[#ef4444] text-sm font-semibold">
            Oops! Server busy.
          </span>
        </div>
        <button
          onClick={onDismiss}
          className="text-[#ef4444]/60 hover:text-[#ef4444] transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="text-[#aaa] text-[13px] pl-[26px]">
        4.9K users in the queue.{" "}
        <button
          onClick={onDismiss}
          className="text-[#aaa] underline hover:text-white transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export function InvalidPromptAlert({ onDismiss }: { onDismiss?: () => void }) {
  return (
    <div className="rounded-2xl p-3 flex gap-3.5 group relative hover:bg-white/5 transition-colors mt-2 mb-2">
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 text-[#555] hover:text-[#888] transition-colors rounded-full bg-[#222] p-0.5 opacity-0 group-hover:opacity-100"
      >
        <X className="w-3.5 h-3.5" />
      </button>
      <div className="w-[72px] h-[72px] rounded-[16px] shrink-0 bg-accent-yellow flex items-center justify-center text-3xl shadow-inner">
        🥲
      </div>
      <div className="flex-1 min-w-0 py-1">
        <h4 className="text-white text-[14px] font-bold">Invalid Prompt</h4>
        <p className="text-[#666] text-[13px] mt-0.5 line-clamp-1">
          This is not a good prompt
        </p>
        <p className="text-[#ccc] text-[13px] leading-relaxed mt-2.5 pr-2">
          Your prompt does not seem to be valid. Please provide a prompt related
          to song creation, remixing, covers, or similar music tasks.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={onDismiss}
            className="h-8 px-4 border border-[#333] hover:border-[#555] rounded-full text-[#ccc] hover:text-white text-[13px] font-medium transition-colors"
          >
            Retry
          </button>
          <button className="h-8 px-4 border border-[#333] hover:border-[#555] rounded-full text-[#ccc] hover:text-white text-[13px] font-medium transition-colors">
            Copy prompt
          </button>
        </div>
      </div>
    </div>
  );
}
