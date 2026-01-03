"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import soccerAnimation from "../../../../../public/animations/soccer.json";
import trophyAnimation from "../../../../../public/animations/trophy.json";
import moneyAnimation from "../../../../../public/animations/money.json";
import { useRodadasAtivasModel } from "./rodadas-ativas.model";
import { AnimationType } from "./rodadas-ativas.types";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import { useState } from "react";
import { BettingModal } from "@/app/apostar/_components/betting-flow/betting-modal";

const animations: Record<AnimationType, object> = {
  soccer: soccerAnimation,
  trophy: trophyAnimation,
  money: moneyAnimation,
};

export function RodadasAtivas() {
  const { actions } = useRodadasAtivasModel();
  const [isBettingModalOpen, setIsBettingModalOpen] = useState(false);

  // Intercept Apostar action
  const actionsWithModal = actions.map(action => {
    if (action.title === "Apostar") {
      return {
        ...action,
        href: undefined,
        onClick: () => setIsBettingModalOpen(true)
      };
    }
    return action;
  });

  // Replace original actions with actionsWithModal in render
  // Note: I will update the map call in the previous edit to use 'actionsWithModal' OR update the hook.
  // Actually, better to update the map in valid JSX.


  return (
    <section id="rodadas" className="w-full py-10 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Rodada Ativa
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {actionsWithModal.map((action) => (
            action.href ? (
              <Link key={action.id} href={action.href}>
                <div className={`${action.bgColor} rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform shadow-xl min-h-[160px] md:min-h-[200px]`}>
                  <div className="w-16 h-16 md:w-20 md:h-20 mb-2">
                    <Lottie
                      animationData={animations[action.animation]}
                      loop
                      autoplay
                      style={{ width: "100%", height: "100%" }}
                    />
                  </div>
                  <span className="text-white font-bold text-sm md:text-lg text-center">
                    {action.title}
                  </span>
                  <span className="text-white/80 text-xs text-center mt-1">
                    {action.subtitle}
                  </span>
                </div>
              </Link>
            ) : (
              <div
                key={action.id}
                onClick={action.onClick}
                className={`${action.bgColor} rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center cursor-pointer hover:scale-[1.02] transition-transform shadow-xl min-h-[160px] md:min-h-[200px]`}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mb-2">
                  <Lottie
                    animationData={animations[action.animation]}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <span className="text-white font-bold text-sm md:text-lg text-center">
                  {action.title}
                </span>
                <span className="text-white/80 text-xs text-center mt-1">
                  {action.subtitle}
                </span>
              </div>
            )
          ))}
        </div>
      </div>

      <BettingModal isOpen={isBettingModalOpen} onClose={() => setIsBettingModalOpen(false)} />
    </section>
  );
}
