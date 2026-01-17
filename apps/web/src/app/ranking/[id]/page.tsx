import { RankingTable, RankingKpis } from "../_components";
import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { ChevronLeft, Zap, Trophy } from "lucide-react";
import Link from "next/link";

interface RankingRoundPageProps {
  params: Promise<{ id: string }>;
}

export default async function RankingRoundPage({ params }: RankingRoundPageProps) {
  const { id } = await params;
  const roundId = parseInt(id);

  return (
    <main className="min-h-screen bg-white pb-12">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-black">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-transparent hover:border-black"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </Link>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-none flex items-center gap-3">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500" />
                Ranking <span className="text-yellow-400">#{id}</span>
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2 ml-1">Acompanhe a classificação detalhada da rodada</p>
            </div>
          </div>

          <div className="flex bg-black px-6 py-3 border border-yellow-400 items-center gap-3">
            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-black uppercase italic text-sm tracking-widest">Atualizado em Tempo Real</span>
          </div>
        </div>

        <div className="space-y-12">
          <RankingKpis roundId={roundId} />
          <RankingTable roundId={roundId} />
        </div>
      </div>
    </main>
  );
}
