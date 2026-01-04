"use client";

import Link from "next/link";
import { useUserActions } from "./hooks/use-user-actions";
import { BettingModal } from "@/app/apostar/_components/betting-flow/betting-modal";

export function UserActions() {
  const { actions, isBettingModalOpen, setIsBettingModalOpen } =
    useUserActions();

  return (
    <section id="acoes" className="w-full py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Acesso Rápido</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action) => (
            <Link
              key={action.id}
              href={action.href || ""}
              onClick={action.onClick}
              className={`${action.className} rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all hover:shadow-md min-h-[140px] gap-3`}
            >
              <div className="text-4xl mb-1">{action.emoji}</div>
              <div className="text-center">
                <span className="block font-semibold text-lg">
                  {action.title}
                </span>
                <span className="block text-sm opacity-80 mt-1">
                  {action.subtitle}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <BettingModal
        isOpen={isBettingModalOpen}
        onClose={() => setIsBettingModalOpen(false)}
      />
    </section>
  );
}
