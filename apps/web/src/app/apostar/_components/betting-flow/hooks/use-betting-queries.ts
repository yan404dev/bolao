import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roundService, betService } from "@/shared/services";

export function useBettingQueries() {
  const queryClient = useQueryClient();

  const activeRoundQuery = useQuery({
    queryKey: ["activeRound"],
    queryFn: () => roundService.getActiveRound(),
  });

  const createBetMutation = useMutation({
    mutationFn: betService.create,
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
