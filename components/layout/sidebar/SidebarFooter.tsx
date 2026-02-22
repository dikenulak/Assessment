import Link from "next/link";

export function SidebarFooter() {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-text-dark">
        <Link href="#" className="hover:text-text-subtle">
          Pricing
        </Link>
        <Link href="#" className="hover:text-text-subtle">
          Affiliate
        </Link>
        <Link href="#" className="hover:text-text-subtle">
          API
        </Link>
        <Link href="#" className="hover:text-text-subtle">
          About
        </Link>
        <Link href="#" className="hover:text-text-subtle">
          Terms
        </Link>
        <Link href="#" className="hover:text-text-subtle">
          Privacy
        </Link>
        <button className="flex items-center gap-1.5 text-[11px] text-text-dark hover:text-text-subtle">
          <span>🇺🇸</span>
          <span>EN</span>
          <span className="text-[9px] scale-x-75">▼</span>
        </button>
      </div>
    </div>
  );
}
