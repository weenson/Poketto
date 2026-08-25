"use client";

import { useState, useEffect } from "react";
import { navItems } from "./item";
import { NavItemProps } from "./item";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function SideNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const collapseState = localStorage.getItem("sidebar-collapsed");
    if (collapseState === "true") setCollapsed(true);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidebar-collapsed", String(next));
      return next;
    });
  };

  return (
    <nav
      className={`hidden md:block bg-white shadow-sm border-r border-gray-200 ${collapsed ? "w-16" : "w-64"}`}
    >
      <div
        className={`flex flex-col gap-4 py-4 ${collapsed ? "items-center" : "px-2"}`}
      >
        {" "}
        <div className="flex h-10 gap-2 items-center">
          <button onClick={toggleCollapsed} className="cursor-pointer">
            <Menu />
          </button>
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold">Poketto</span>
            </Link>
          )}
        </div>
        {navItems.map(({ href, label, icon: Icon }: NavItemProps) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-1 items-center gap-2 p-4 text-muted-text ${pathname === href ? "text-primary bg-primary-light/20 rounded-lg" : ""}`}
          >
            <Icon size={25} />
            {!collapsed && <span>{label}</span>}
          </Link>
        ))}
      </div>
    </nav>
  );
}
