import { useClosedRoundsQuery } from "./use-closed-rounds-query";

export function useClosedRounds() {
  const { data: allRounds = [], isLoading, error } = useClosedRoundsQuery();

  const rounds = allRounds.filter(round => round.status === 'OPEN');

  return {
    rounds,
    isLoading,
    error,
  };
}
