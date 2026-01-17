import { Suspense } from "react";
import { RankingTable, RankingKpis, RankingTableLoader } from "./_components";
import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { BackButton } from "@/shared/components/back-button/back-button";
import { Trophy, Zap } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analistas de Precisão | Ranking de Inteligência no Futebol",
  description: "Acompanhe os maiores estrategistas do cenário esportivo. Veja quem lidera a arena através da competência tática e leitura técnica das partidas.",
};

export default function RankingPage() {
  return (
    <main className="min-h-screen bg-white pb-12">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="mt-1 sm:mt-0">
              <BackButton />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-tight sm:leading-none flex flex-wrap items-center gap-2 sm:gap-3">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 shrink-0" />
                Ranking <span className="text-yellow-400">Geral</span>
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs mt-1 sm:mt-2 ml-0 sm:ml-1 line-clamp-1 sm:line-clamp-none">
                Acompanhe os líderes da temporada
              </p>
            </div>
          </div>

          <div className="flex bg-black px-4 sm:px-6 py-2 sm:py-3 border border-yellow-400 items-center gap-3 w-fit sm:w-auto">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 shrink-0" />
            <span className="text-white font-black uppercase italic text-[10px] sm:text-sm tracking-widest">Real-Time</span>
          </div>
        </div>

        <Suspense fallback={<RankingTableLoader />}>
          <div className="space-y-12">
            <RankingKpis />
            <RankingTable />
          </div>
        </Suspense>
      </div>

    </main>
  );
}
