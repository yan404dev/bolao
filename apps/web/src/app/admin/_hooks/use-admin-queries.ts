import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { roundService } from "@/shared/services/round.service";
import { toast } from "sonner";

export function useAdminQueries() {
  const queryClient = useQueryClient();
  const [country, setCountry] = useState("Brazil");

  const { data: rounds = [], isLoading: isLoadingRounds } = useQuery({
    queryKey: ["rounds", "all"],
    queryFn: () => roundService.getAll(),
  });

  const { data: leagues = [], isLoading: isLoadingLeagues } = useQuery({
    queryKey: ["leagues", country],
    queryFn: () => roundService.getLeagues(country),
  });

  const syncMutation = useMutation({
    mutationFn: ({ leagueId, season }: { leagueId: number; season: number }) =>
      roundService.syncAll(leagueId, season),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds"] });
      toast.success("Campeonato sincronizado com sucesso!");
    },
    onError: () => toast.error("Falha ao sincronizar campeonato."),
  });

  const calculateMutation = useMutation({
    mutationFn: (roundId: number) => roundService.calculateScores(roundId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds"] });
      toast.success("Pontuações calculadas com sucesso!");
    },
    onError: () => toast.error("Erro ao calcular pontuações."),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ roundId, status }: { roundId: number; status: string }) =>
      roundService.updateStatus(roundId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds"] });
      toast.success("Status da rodada atualizado!");
    },
    onError: () => toast.error("Erro ao atualizar status."),
  });

  const batchActionMutation = useMutation({
    mutationFn: ({ ids, action }: { ids: number[]; action: string }) =>
      roundService.batchAction(ids, action),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds"] });
      toast.success("Ação em lote processada com sucesso!");
    },
    onError: () => toast.error("Erro ao processar ação em lote."),
  });

  const updateRoundMutation = useMutation({
    mutationFn: ({ roundId, data }: { roundId: number; data: { endDate?: string } }) =>
      roundService.update(roundId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds"] });
      toast.success("Rodada atualizada com sucesso!");
    },
    onError: () => toast.error("Erro ao atualizar rodada."),
  });

  const deleteMatchMutation = useMutation({
    mutationFn: (matchId: number) => roundService.deleteMatch(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rounds"] });
      toast.success("Partida removida com sucesso!");
    },
    onError: () => toast.error("Erro ao remover partida."),
  });

  return {
    rounds,
    isLoadingRounds,
    leagues,
    isLoadingLeagues,
    country,
    setCountry,
    sync: syncMutation.mutate,
    isSyncing: syncMutation.isPending,
    calculate: calculateMutation.mutate,
    isCalculating: calculateMutation.isPending,
    updateStatus: updateStatusMutation.mutate,
    isUpdatingStatus: updateStatusMutation.isPending,
    batchAction: batchActionMutation.mutate,
    isBatchProcessing: batchActionMutation.isPending,
    updateRound: updateRoundMutation.mutate,
    isUpdatingRound: updateRoundMutation.isPending,
    deleteMatch: deleteMatchMutation.mutate,
    isDeletingMatch: deleteMatchMutation.isPending,
  };
}
