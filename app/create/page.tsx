import PromptBox from "@/components/features/create/PromptBox";
import RecentGenerations from "@/components/features/create/RecentGenerations";
import ScenarioDebugger from "@/components/features/create/ScenarioDebugger";

export default function CreatePage() {
  return (
    <div className="px-4 md:px-8 pb-32 md:pb-8">
      <div className="space-y-12 flex flex-col justify-center min-h-[calc(100dvh-350px)] w-full">
        {/* Header text */}
        <div className="text-center space-y-2 mb-8 mt-12">
          <h1 className="text-3xl font-bold text-white">
            What Song to Create?
          </h1>
        </div>
        <PromptBox />
      </div>
      <div className="w-full mx-auto max-w-3xl">
        <RecentGenerations />
        <ScenarioDebugger />
      </div>
    </div>
  );
}
