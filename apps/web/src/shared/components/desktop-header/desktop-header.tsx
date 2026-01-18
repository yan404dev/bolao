"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Calendar, FileText, LayoutDashboard, Home } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Ranking", href: "/ranking", icon: Trophy },
  { label: "Calendário", href: "/calendario", icon: Calendar },
  { label: "Regulamento", href: "/regulamento", icon: FileText },
];

export function DesktopHeader() {
  const pathname = usePathname();

  return (
    <header className="hidden md:block sticky top-0 z-50 bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-yellow-400 border-2 border-black p-1.5 rotate-3 group-hover:rotate-0 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Trophy className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black uppercase italic tracking-tighter text-black">
              ARENA <span className="text-yellow-500">DE ELITE</span>
            </span>
          </Link>

          <nav className="flex items-center gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 flex items-center gap-2 group",
                    "text-xs font-black uppercase tracking-widest transition-all",
                    isActive ? "text-black" : "text-gray-400 hover:text-black"
                  )}
                >
                  <item.icon className={cn(
                    "w-4 h-4 transition-colors",
                    isActive ? "text-yellow-500" : "text-gray-300 group-hover:text-yellow-500"
                  )} />
                  {item.label}
                  {isActive && (
                    <div className="absolute -bottom-[28px] left-0 right-0 h-1.5 bg-yellow-400 border-x-2 border-t-2 border-black" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="h-10 w-[2px] bg-black/10 mx-2" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-black/40">Sessão Ativa</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
