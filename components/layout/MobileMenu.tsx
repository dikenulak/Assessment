"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGenerationStore } from "@/store/useGenerationStore";
import Image from "next/image";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarPromo } from "./sidebar/SidebarPromo";
import { SidebarFooter } from "./sidebar/SidebarFooter";

export default function MobileMenu() {
  const isOpen = useGenerationStore((state) => state.isMobileMenuOpen);
  const closeMenu = useGenerationStore((state) => state.closeMobileMenu);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMenu}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 400, damping: 40 }}
            className="fixed inset-y-0 left-0 w-[80vw] max-w-[320px] bg-bg-sidebar border-r border-border-layout z-50 md:hidden flex flex-col pt-4 px-4 pb-8"
          >
            {/* Header: Logo & Close */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5 px-2">
                <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                <span className="font-bold text-white tracking-wide text-lg">
                  MusicGPT
                </span>
              </div>
              <button
                onClick={closeMenu}
                className="p-2 text-text-muted hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Bar */}
            <div className="mb-6 px-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-white/5 border-border-input text-icon-muted hover:border-border-input-hover hover:text-white hover:bg-bg-hover-dark h-auto py-2 rounded-[30px]"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </Button>
            </div>

            {/* Main Nav Area (scrollable if needed) */}
            <div className="flex-1 overflow-y-auto w-full -mx-2 px-2 scrollbar-none pb-4">
              <div className="space-y-6">
                <div onClick={closeMenu}>
                  <SidebarNav />
                </div>

                <div className="space-y-4 pt-4 border-t border-white/5">
                  <SidebarPromo />
                  <SidebarFooter />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
