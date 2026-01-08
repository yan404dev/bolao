import { useTickerBannerQueries } from "./use-ticker-banner-queries";
import { formatCurrency } from "@/shared/lib/utils";

export function useTickerBanner() {
  const { activeRound, isLoading } = useTickerBannerQueries();

  const ticketsSold = activeRound?.totalTickets || 0;
  const prizePool = activeRound?.prizePool ? formatCurrency(activeRound.prizePool) : "R$ 0,00";
  const hasActiveRound = !!activeRound;

  return {
    ticketsSold,
    prizePool,
    hasActiveRound,
    isLoading,
  };
}
