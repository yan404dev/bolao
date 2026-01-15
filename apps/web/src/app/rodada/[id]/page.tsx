"use client";

import { RoundHeader, RoundKpis, RoundMatches, RoundRanking, StandingsTable } from "./_components";
import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { BackButton } from "@/shared/components/back-button/back-button";
import { Zap } from "lucide-react";
import { useBettingModalState } from "@/shared/providers/betting-modal-provider";
import { use } from "react";

interface RoundPageProps {
  params: Promise<{ id: string }>;
}

export default function RoundPage({ params }: RoundPageProps) {
  const { id } = use(params);
  const roundId = parseInt(id);
  const { openModal } = useBettingModalState();

  return (
    <main className="min-h-screen bg-white pb-12">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 text-black">
        <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="mt-1 sm:mt-0">
              <BackButton />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-tight sm:leading-none flex flex-wrap items-center gap-2 sm:gap-3">
                <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 shrink-0" />
                Rodada <span className="text-yellow-400 whitespace-nowrap">#{id}</span>
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs mt-1 sm:mt-2 ml-0 sm:ml-1 line-clamp-1 sm:line-clamp-none">
                Detalhes e classificação
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={openModal}
              className="px-8 py-4 bg-yellow-400 text-black border-2 border-black font-black uppercase italic tracking-tighter text-xl hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-2px] hover:translate-y-0 flex items-center gap-3"
            >
              <Zap className="w-6 h-6 fill-current" />
              JOGAR AGORA
            </button>
          </div>
        </div>

        <div className="space-y-12">
          <RoundHeader roundId={roundId} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <RoundMatches roundId={roundId} />
            </div>
            <div className="lg:col-span-4 space-y-12">
              <div className="sticky top-24">
                <StandingsTable roundId={roundId} />
                <div className="mt-12 space-y-12">
                  <RoundKpis roundId={roundId} />
                  <RoundRanking roundId={roundId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
