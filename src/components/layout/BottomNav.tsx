"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Library, User } from "lucide-react";
import { cn } from "../../lib/utils";
import { usePlayerStore } from "../../store/usePlayerStore";

const navItems = [
  { href: "/home", label: "Accueil", icon: Home },
  { href: "/search", label: "Recherche", icon: Search },
  { href: "/library", label: "Bibliothèque", icon: Library },
  { href: "/profile", label: "Profil", icon: User },
];

export function BottomNav() {
  const pathname = usePathname();
  const selectedPlan = usePlayerStore((state) => state.selectedPlan);

  const planColor =
    selectedPlan === "basic"
      ? "text-green-500"
      : selectedPlan === "standard"
      ? "text-yellow-400"
      : "text-blue-500";

  const planColorMuted =
    selectedPlan === "basic"
      ? "text-green-500/70"
      : selectedPlan === "standard"
      ? "text-yellow-400/70"
      : "text-blue-500/70";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-black">
      <div className="mx-auto flex max-w-md items-center justify-between px-6 py-3">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 text-xs font-semibold transition",
                isActive ? planColor : planColorMuted
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
