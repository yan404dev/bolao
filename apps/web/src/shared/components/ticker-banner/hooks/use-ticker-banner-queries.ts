import { useQuery } from "@tanstack/react-query";
import { bettingService } from "@/app/apostar/_components/betting-flow/betting.service";

export function useTickerBannerQueries() {
  const activeRoundQuery = useQuery({
    queryKey: ["activeRound"],
    queryFn: bettingService.getActiveRound,
  });

  return {
    activeRound: activeRoundQuery.data,
    isLoading: activeRoundQuery.isLoading,
  };
}
