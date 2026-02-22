"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, User, Heart, Sparkles, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Create", href: "/create", icon: Sparkles },
  { name: "Explore", href: "/explore", icon: Compass },
];

const libraryItems = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Liked", href: "/liked", icon: Heart },
  { name: "New playlist", href: "/playlist/new", icon: Plus },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-1 space-y-8 overflow-y-auto">
      <div className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-full text-sm font-semibold transition-all duration-300",
                isActive
                  ? "text-white bg-bg-active"
                  : "text-text-subtle hover:text-white hover:bg-bg-hover-dark",
              )}
            >
              <item.icon
                className={cn(
                  "w-4 h-4",
                  isActive ? "text-white" : "text-text-subtle",
                )}
                fill={isActive ? "currentColor" : "none"}
              />
              {item.name}
            </Link>
          );
        })}
      </div>

      <div>
        <h3 className="text-xs font-bold text-text-dark mb-2 px-3">Library</h3>
        <div className="space-y-1">
          {libraryItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-full text-sm font-semibold text-text-subtle hover:text-white hover:bg-bg-hover-dark transition-colors duration-300"
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
