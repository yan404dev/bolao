import { PageHeader } from "@/shared/components/page-header";
import { Suspense } from "react";
import { RankingTable, RankingKpis, RankingTableLoader } from "./_components";
import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { Zap } from "lucide-react";
import { Metadata } from "next";

export default function RankingPage() {
  return (
    <main className="min-h-screen bg-white pb-12">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <PageHeader
          title="Ranking"
          highlightedTitle="Geral"
          subtitle="Acompanhe os líderes da temporada"
          badge={
            <div className="flex bg-black px-4 sm:px-6 py-2 sm:py-3 border border-yellow-400 items-center gap-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              <span className="text-white font-black uppercase italic text-[10px] sm:text-xs tracking-[0.2em]">Real-Time</span>
            </div>
          }
        />

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
