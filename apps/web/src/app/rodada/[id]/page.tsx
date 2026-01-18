import {
  RoundHeader,
  RoundKpis,
  RoundMatches,
  RoundRanking,
  RoundPlayButton,
  StandingsTable,
} from "./_components";
import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { PageHeader } from "@/shared/components/page-header";
import { Metadata } from "next";
import { roundService } from "@/shared/services/round.service";
import { Zap } from "lucide-react";

interface RoundPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: RoundPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const round = await roundService.getById(parseInt(id));
    const roundNumber = round.externalRoundId?.match(/(\d+)$/)?.[1] || id;
    return {
      title: `Análise Tática da Rodada de Futebol #${roundNumber} — ${round.title}`,
      description: `Mergulhe na análise técnica dos jogos da Rodada #${roundNumber}. Compare estatísticas, demonstre sua visão de jogo e posicione-se entre os melhores especialistas na Arena de Elite.`,
    };
  } catch (error) {
    return {
      title: `Rodada de Futebol #${id} | Inteligência Esportiva`,
      description: `Dashboard de análise para as partidas da Rodada #${id}. Prepare seus prognósticos técnicos na Arena de Elite.`,
    };
  }
}

export default async function RoundPage({ params }: RoundPageProps) {
  const { id } = await params;
  const roundId = parseInt(id);

  let roundNumber = id;
  try {
    const round = await roundService.getById(roundId);
    roundNumber = round.externalRoundId?.match(/(\d+)$/)?.[1] || id;
  } catch (error) {
    console.error("Failed to fetch round data for PageHeader:", error);
  }

  return (
    <main className="min-h-screen bg-white pb-12">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 text-black">
        <PageHeader
          title={`Rodada #${roundNumber}`}
          subtitle="Detalhes e classificação em tempo real"
          badge={
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-black/50">Insights Táticos</span>
              </div>
              <RoundPlayButton />
            </div>
          }
        />

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
