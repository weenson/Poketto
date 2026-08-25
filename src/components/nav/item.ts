import { Home, ChartPie, PiggyBank, User } from "lucide-react";
import { LucideIcon } from "lucide-react";

export type NavItemProps = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const navItems: NavItemProps[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/budget", label: "Budget", icon: ChartPie },
  { href: "/savings", label: "Saving", icon: PiggyBank },
  { href: "/profile", label: "Profile", icon: User },
];
