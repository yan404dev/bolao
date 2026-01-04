import { useQuery } from "@tanstack/react-query";
import { closedRoundsService } from "../closed-rounds.service";

export function useClosedRoundsQuery() {
  return useQuery({
    queryKey: ["rounds", "closed"],
    queryFn: closedRoundsService.getAll,
  });
}
