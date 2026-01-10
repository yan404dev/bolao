import { useQuery } from "@tanstack/react-query";
import { roundService } from "@/shared/services";

export function useTickerBannerQueries() {
  const activeRoundQuery = useQuery({
    queryKey: ["activeRound"],
    queryFn: () => roundService.getActiveRound(),
  });

  return {
    activeRound: activeRoundQuery.data,
    isLoading: activeRoundQuery.isLoading,
  };
}
