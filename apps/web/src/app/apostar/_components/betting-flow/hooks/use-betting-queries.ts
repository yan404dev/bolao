import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { bettingService } from "../betting.service";

export function useBettingQueries() {
  const queryClient = useQueryClient();

  const activeRoundQuery = useQuery({
    queryKey: ["activeRound"],
    queryFn: bettingService.getActiveRound,
  });

  const createBetMutation = useMutation({
    mutationFn: bettingService.createBet,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activeRound"] });
    },
  });

  return {
    activeRound: activeRoundQuery.data,
    isLoadingRound: activeRoundQuery.isLoading,
    createBetMutation,
  };
}
