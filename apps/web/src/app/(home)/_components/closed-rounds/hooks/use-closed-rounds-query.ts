import { useQuery } from "@tanstack/react-query";
import { roundService } from "@/shared/services/round.service";

export function useClosedRoundsQuery() {
  return useQuery({
    queryKey: ["rounds", "upcoming"],
    queryFn: () => roundService.getUpcomingRounds(4),
  });
}
