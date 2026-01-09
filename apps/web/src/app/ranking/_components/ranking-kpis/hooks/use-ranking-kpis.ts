import { useRankingKpisQueries } from "@/app/ranking/_components/ranking-kpis/hooks/use-ranking-kpis-queries";

export interface KpiItem {
  label: string;
  value: string;
  icon: string;
}

export function useRankingKpis(roundId?: number) {
  const { roundDetails, rankingData, isLoading } = useRankingKpisQueries(roundId);

  const kpis: KpiItem[] = roundDetails ? [
    { label: "BILHETES", value: String(roundDetails.totalTickets || 0), icon: "🎫" },
    { label: "PRÊMIO", value: `R$ ${(roundDetails.prizePool / 100)?.toLocaleString("pt-BR", { minimumFractionDigits: 2 }) || "0,00"}`, icon: "💰" },
    { label: "PARTICIPANTES", value: String(rankingData?.totalItems || 0), icon: "👥" },
    { label: "JOGOS", value: String(roundDetails.matches?.length || 0), icon: "⚽" },
  ] : [];

  return { kpis, isLoading };
}
