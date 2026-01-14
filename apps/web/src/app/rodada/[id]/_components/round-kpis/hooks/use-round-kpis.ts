import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { formatCurrency } from "@/shared/lib/utils";

export interface KpiItem {
  label: string;
  value: string;
  icon: string;
}

export function useRoundKpis(roundId: number) {
  const { round, isLoading } = useRoundQueries(roundId);

  const kpis: KpiItem[] = round ? [
    { label: "PALPITES", value: String(round.totalTickets || 0), icon: "🎫" },
    { label: "PRÊMIO ESTIMADO", value: formatCurrency(round.prizePool || 0), icon: "💰" },
    { label: "PARTIDAS", value: String(round.matches?.length || 0), icon: "⚽" },
  ] : [];

  return { kpis, isLoading };
}
