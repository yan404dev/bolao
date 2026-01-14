import { useQuery } from "@tanstack/react-query";
import { roundService } from "@/shared/services/round.service";

export function useActiveRoundQuery() {
  return useQuery({
    queryKey: ["activeRound"],
    queryFn: () => roundService.getActiveRound(),
  });
}
