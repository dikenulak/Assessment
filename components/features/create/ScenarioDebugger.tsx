"use client";

import { useGenerationStore } from "@/store/useGenerationStore";
import { FailureReason } from "@/types/generation";
import { Button } from "@/components/ui/Button";

export default function ScenarioDebugger() {
  const addGeneration = useGenerationStore((state) => state.addGeneration);
  const updateGeneration = useGenerationStore(
    (state) => state.updateGeneration,
  );
  const incrementUnseenCount = useGenerationStore(
    (state) => state.incrementUnseenCount,
  );

  const triggerScenario = (reason: FailureReason, label: string) => {
    // 1. Create a dummy generation
    const id = addGeneration(`Simulating: ${label}`);

    // 2. Immediately mark it as failed with the specific reason
    setTimeout(() => {
      updateGeneration(id, {
        status: "failed",
        failureReason: reason,
      });
      incrementUnseenCount();
    }, 500);
  };

  return (
    <div className="mt-12 p-4 bg-white/5 border border-white/10 rounded-2xl max-w-3xl mx-auto flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
        Debug Scenarios
      </h3>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() =>
            triggerScenario("insufficient_credits", "No Credits Left")
          }
        >
          Simulate: Insufficient Credits
        </Button>
        <Button
          variant="secondary"
          onClick={() => triggerScenario("server_busy", "Server Overload")}
        >
          Simulate: Server Busy
        </Button>
        <Button
          variant="secondary"
          onClick={() => triggerScenario("invalid_prompt", "Bad Rules")}
        >
          Simulate: Invalid Prompt
        </Button>
      </div>
    </div>
  );
}
