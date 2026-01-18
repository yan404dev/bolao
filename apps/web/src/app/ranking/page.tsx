import { PageHeader } from "@/shared/components/page-header";

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
            <div className="flex bg-black px-4 sm:px-6 py-2 sm:py-3 border border-yellow-400 items-center gap-3 w-fit sm:w-auto">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 shrink-0" />
              <span className="text-white font-black uppercase italic text-[10px] sm:text-sm tracking-widest">Real-Time</span>
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
