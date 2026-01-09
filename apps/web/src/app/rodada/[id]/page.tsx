import { RoundHeader, RoundKpis, RoundMatches, RoundRanking } from "./_components";
import { TickerBanner } from "@/shared/components/ticker-banner";
import { ChevronLeft, Zap } from "lucide-react";
import Link from "next/link";

interface RoundPageProps {
  params: Promise<{ id: string }>;
}

export default async function RoundPage({ params }: RoundPageProps) {
  const { id } = await params;
  const roundId = parseInt(id);

  return (
    <main className="min-h-screen bg-white pb-12">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 text-black">
        <div className="mb-12 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors border-2 border-transparent hover:border-black"
            >
              <ChevronLeft className="w-6 h-6 text-black" />
            </Link>
            <div>
              <h1 className="text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-none flex items-center gap-3">
                <Zap className="w-12 h-12 text-yellow-500" />
                Rodada <span className="text-yellow-400">#{id}</span>
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2 ml-1">Detalhes e classificação da rodada</p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {/* BANNER DA RODADA */}
          <RoundHeader roundId={roundId} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <RoundMatches roundId={roundId} />
            </div>
            <div className="lg:col-span-4 space-y-12">
              <RoundKpis roundId={roundId} />
              <div className="brutalist-card p-0.5 bg-black">
                <div className="bg-white p-4">
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
