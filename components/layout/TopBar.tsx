"use client";
import { useGenerationStore } from "@/store/useGenerationStore";
import { Menu } from "lucide-react";

export default function TopBar() {
  const toggleProfile = useGenerationStore((state) => state.toggleProfile);
  const toggleMobileMenu = useGenerationStore(
    (state) => state.toggleMobileMenu,
  );
  const unseenCount = useGenerationStore((state) => state.unseenCount);
  const isMobileMenuOpen = useGenerationStore(
    (state) => state.isMobileMenuOpen,
  );

  return (
    <div className="top-4 z-50 flex justify-between md:justify-end items-center gap-4 sticky">
      {/* Mobile Hamburger Menu */}
      {!isMobileMenuOpen && (
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 -ml-2 text-text-muted hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          aria-label="Open mobile menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <button
        onClick={toggleProfile}
        className="group relative flex items-center gap-3 rounded-full transition-transform active:scale-95 hover:bg-white/5"
      >
        <div className="relative w-10 h-10 rounded-full bg-grad-avatar-ring p-[2px]">
          <div className="w-full h-full rounded-full bg-bg-sidebar border-2 border-bg-page overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Johnny"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Notification Badge */}
          {unseenCount > 0 && (
            <div className="absolute top-0 -right-1 flex h-4 w-4 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-badge-teal opacity-50 duration-500"></span>
              <span className="relative inline-flex h-full w-full items-center justify-center rounded-full bg-badge-teal text-[10px] leading-none font-semibold text-badge-text">
                {unseenCount}
              </span>
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
