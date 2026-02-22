"use client";

import { useEffect } from "react";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global Error Boundary caught an error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-white mb-2">
        Something went wrong!
      </h2>
      <p className="text-[#888] text-sm mb-8 max-w-md mx-auto">
        We encountered an unexpected error. You can try recovering by clicking
        the button below.
      </p>
      <Button onClick={() => reset()} variant="primary" className="gap-2 px-6">
        <RefreshCcw className="w-4 h-4" />
        Try again
      </Button>
    </div>
  );
}
