"use client";

import { Zap, Trophy, Users, MoveRight } from "lucide-react";
import { useBettingModalState } from "@/shared/providers/betting-modal-provider";
import { useActiveRoundCta } from "./hooks";

export function ActiveRoundCTA() {
  const { openModal } = useBettingModalState();
  const {
    title,
    prizePool,
    totalTickets,
    hasActiveRound,
    isLoading
  } = useActiveRoundCta();

  if (isLoading || !hasActiveRound) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-12 relative z-10 mb-12 sm:mb-20">
      <div className="bg-white border-4 border-black p-0.5 sm:p-1 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] sm:shadow-[12px_12px_0px_0px_rgba(251,191,36,1)]">
        <div className="border-2 border-black p-5 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-12">

          <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-black text-yellow-400 px-3 py-1.5 sm:px-4 sm:py-2 font-black uppercase italic tracking-tighter text-[10px] sm:text-sm">
              <Zap className="w-3.5 h-3.5 fill-current" />
              Rodada Ativa
            </div>

            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-2xl sm:text-6xl font-black uppercase italic tracking-tighter text-black leading-none break-words">
                {title}
              </h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[9px] sm:text-sm opacity-80 sm:opacity-100">
                A disputa já começou. Entre para a elite.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 sm:gap-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-400 border-2 border-black flex items-center justify-center rotate-3 scale-90 sm:scale-100">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">PRÊMIO</p>
                  <p className="text-lg sm:text-2xl font-black text-black leading-none mt-1 whitespace-nowrap">{prizePool}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white border-2 border-black flex items-center justify-center -rotate-3 scale-90 sm:scale-100">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">PALPITES</p>
                  <p className="text-lg sm:text-2xl font-black text-black leading-none mt-1">{totalTickets}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0">
            <button
              onClick={openModal}
              className="group relative flex items-center justify-center w-full md:w-[280px] h-[70px] sm:h-[100px] bg-yellow-400 border-4 border-black hover:bg-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] sm:translate-y-[-4px] hover:translate-y-0"
            >
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-3xl font-black uppercase italic tracking-tighter text-black group-hover:text-yellow-400 transition-colors">
                  JOGAR AGORA
                </span>
                <span className="flex items-center gap-2 text-[8px] sm:text-[10px] font-bold text-black group-hover:text-yellow-400 tracking-widest uppercase">
                  CLIQUE AQUI <MoveRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
