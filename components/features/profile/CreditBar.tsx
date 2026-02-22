import { Info } from "lucide-react";

export default function CreditBar() {
  return (
    <div className="bg-bg-card border border-border-card rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-text-secondary">
          <span>Credits</span>
          <Info className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
        </div>
        <span className="text-sm font-bold text-white">120 / 500</span>
      </div>

      {/* Progress Bar */}
      <div className="h-2 w-full bg-bg-input rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-accent-orange to-accent-pink rounded-full"
          style={{ width: "24%" }}
        />
      </div>

      <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-xs font-semibold uppercase tracking-wider text-white rounded-lg transition-colors">
        Top Up ›
      </button>
    </div>
  );
}
