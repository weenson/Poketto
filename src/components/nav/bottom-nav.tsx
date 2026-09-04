"use client";

import { navItems } from "./item";
import { NavItemProps } from "./item";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 md:hidden">
      <div className="flex flex-row bg-white shadow-sm">
        {navItems.map(({ href, label, icon: Icon }: NavItemProps) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center gap-2 py-2 text-muted-text ${pathname === href ? "text-primary bg-linear-to-b from-primary-light/20 to-primary-light/0 border-t border-primary-light rounded-lg" : ""}`}
          >
            <Icon size={18} />
            <span className="text-sm">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
