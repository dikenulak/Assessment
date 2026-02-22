"use client";

import { Search } from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { SidebarNav } from "./sidebar/SidebarNav";
import { SidebarPromo } from "./sidebar/SidebarPromo";
import { SidebarFooter } from "./sidebar/SidebarFooter";

export default function Sidebar() {
  useWebSocket();

  return (
    <aside className="hidden md:flex w-50 h-screen bg-bg-sidebar flex-col fixed left-0 top-0 z-40 border-r border-border-layout gap-8 py-4 px-4">
      {/* Logo */}
      <div className=" flex items-center gap-2.5">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
        <span className="font-bold text-white tracking-wide text-lg">
          MusicGPT
        </span>
      </div>

      {/* Search Bar */}
      <div>
        <Button
          variant="outline"
          className="w-full justify-between bg-white/5 border-border-input text-icon-muted hover:border-border-input-hover hover:text-white hover:bg-bg-hover-dark h-auto py-2 group rounded-[30px]"
        >
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </div>
          <span className="text-xs bg-bg-hover px-1.5 py-0.5 rounded text-text-dark group-hover:text-text-subtle font-normal">
            ⌘ K
          </span>
        </Button>
      </div>

      {/* Main Nav */}
      <SidebarNav />

      {/* Footer Area */}
      <div className="space-y-4">
        <SidebarPromo />
        <SidebarFooter />
      </div>
    </aside>
  );
}
