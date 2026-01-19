import { useClosedRoundsQuery } from "./use-closed-rounds-query";

export function useClosedRounds() {
  const { data: rounds = [], isLoading, error } = useClosedRoundsQuery();

  return {
    rounds,
    isLoading,
    error,
  };
}
