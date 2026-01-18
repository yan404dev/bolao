import { useActiveRoundQuery } from "./use-active-round-query";
import { formatCurrency } from "@/shared/lib/utils";

export function useActiveRoundCta() {
  const { data: activeRound, isLoading } = useActiveRoundQuery();

  const prizePool = activeRound?.prizePool
    ? formatCurrency(activeRound.prizePool)
    : "R$ 0,00";

  const totalTickets = activeRound?.totalTickets ?? 0;
  const title = activeRound
    ? `${activeRound.championshipTitle} - Rodada #${activeRound.id}`
    : "";
  const hasActiveRound = !!activeRound;

  return {
    activeRound,
    title,
    prizePool,
    totalTickets,
    hasActiveRound,
    isLoading,
  };
}
