"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Trophy, BookText, Zap } from "lucide-react";
import { useBettingModalState } from "@/shared/providers/betting-modal-provider";

export function MobileNav() {
  const pathname = usePathname();
  const { openModal } = useBettingModalState();

  const navItems = [
    { label: "Início", href: "/", icon: Home },
    { label: "Rodadas", href: "/calendario", icon: Calendar },
    {
      label: "Jogar",
      href: "#",
      icon: Zap,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        openModal();
      },
      isCenter: true
    },
    { label: "Ranking", href: "/ranking", icon: Trophy },
    { label: "Regras", href: "/regulamento", icon: BookText },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black z-50 px-2 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          const content = (
            <div className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200 ${isActive ? "bg-yellow-400" : "hover:bg-gray-50"
              } ${item.isCenter ? "text-yellow-500 scale-110 -translate-y-1 font-bold" : ""}`}>
              <Icon
                className={`w-5 h-5 ${item.isCenter ? "text-yellow-500 fill-yellow-500" : (isActive ? "text-black" : "text-gray-500")
                  }`}
              />
              <span
                className={`text-[10px] font-black uppercase tracking-tighter italic ${isActive ? "text-black" : (item.isCenter ? "text-black" : "text-gray-500")
                  }`}
              >
                {item.label}
              </span>
            </div>
          );

          if (item.onClick) {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex-1 h-full outline-none"
              >
                {content}
              </button>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 h-full"
            >
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
