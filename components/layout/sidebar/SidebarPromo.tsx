export function SidebarPromo() {
  return (
    <div className="bg-linear-to-br from-promo-start to-promo-end rounded-xl p-4 border border-[#ffffff10] relative overflow-hidden group cursor-pointer hover:border-[#ffffff20] transition-colors">
      <div className="relative z-10">
        <h4 className="text-xs font-extrabold text-white mb-1">
          Model v6 Pro is here!
        </h4>
        <p className="text-[10px] text-white/70 leading-relaxed">
          Pushing boundaries to the world's best AI music model
        </p>
      </div>
      {/* Glow effect */}
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-accent-purple blur-2xl opacity-40 group-hover:opacity-60 transition-opacity" />
    </div>
  );
}
