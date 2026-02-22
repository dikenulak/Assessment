import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-t-2 border-accent-pink animate-spin"></div>
        <Loader2 className="w-8 h-8 text-white animate-pulse" />
      </div>
      <p className="mt-4 text-[#888] text-sm font-medium animate-pulse">
        Loading...
      </p>
    </div>
  );
}
