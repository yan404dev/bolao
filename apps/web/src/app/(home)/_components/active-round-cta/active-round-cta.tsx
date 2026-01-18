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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-20 relative z-10 mb-12 sm:mb-20">
      <div className="bg-white border-4 border-black p-0.5 sm:p-1 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] sm:shadow-[16px_16px_0px_0px_rgba(251,191,36,1)]">
        <div className="border-2 border-black p-6 sm:p-12 flex flex-col md:flex-row items-center gap-8 sm:gap-16">

          <div className="flex-1 space-y-5 sm:space-y-8 text-center md:text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 lg:h-2 w-10 bg-yellow-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Destaques da Rodada</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-black uppercase italic tracking-tighter text-black leading-none mb-4">
              {title}
            </h2>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] sm:text-lg opacity-90">
              A disputa de elite já começou.
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 sm:gap-12">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-yellow-400 border-2 border-black flex items-center justify-center rotate-3 sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Trophy className="w-5 h-5 sm:w-8 sm:h-8 text-black" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">PRÊMIO</p>
                  <p className="text-xl sm:text-3xl font-black text-black leading-none mt-1 whitespace-nowrap">{prizePool}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white border-2 border-black flex items-center justify-center -rotate-3 sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Users className="w-5 h-5 sm:w-8 sm:h-8 text-black" />
                </div>
                <div>
                  <p className="text-[8px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest leading-none">PALPITES</p>
                  <p className="text-xl sm:text-3xl font-black text-black leading-none mt-1">{totalTickets}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 mt-4 md:mt-0">
            <button
              onClick={openModal}
              className="group relative flex items-center justify-center w-full md:w-[320px] h-[75px] sm:h-[120px] bg-yellow-400 border-4 border-black hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-4px] sm:translate-y-[-6px] hover:translate-y-0"
            >
              <div className="flex flex-col items-center">
                <span className="text-2xl sm:text-4xl font-black uppercase italic tracking-tighter text-black group-hover:text-yellow-400 transition-colors">
                  JOGAR AGORA
                </span>
                <span className="flex items-center gap-2 text-[9px] sm:text-[12px] font-bold text-black group-hover:text-yellow-400 tracking-widest uppercase">
                  ENTRAR NA ARENA <MoveRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1.5 transition-transform" />
                </span>
              </div>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
