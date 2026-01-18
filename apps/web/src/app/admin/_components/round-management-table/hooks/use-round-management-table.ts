import { useState, useCallback } from "react";
import { useAdmin } from "@/app/admin/_hooks/use-admin";

export function useRoundManagementTable() {
  const {
    rounds,
    isLoadingRounds,
    calculate,
    isCalculating,
    updateStatus,
    isUpdatingStatus,
    batchAction,
    isBatchProcessing,
    updateRound,
    isUpdatingRound,
    deleteMatch,
    isDeletingMatch,
  } = useAdmin();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleAll = useCallback(() => {
    setSelectedIds((prev) =>
      prev.length === rounds.length ? [] : rounds.map((r) => r.id)
    );
  }, [rounds]);

  const toggleOne = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const handleBatch = useCallback(
    async (action: string) => {
      if (selectedIds.length === 0) return;
      await batchAction({ ids: selectedIds, action });
      setSelectedIds([]);
    },
    [selectedIds, batchAction]
  );

  const isAllSelected = selectedIds.length === rounds.length && rounds.length > 0;

  return {
    rounds,
    isLoadingRounds,
    selectedIds,
    isAllSelected,
    toggleAll,
    toggleOne,
    clearSelection,
    handleBatch,
    calculate,
    isCalculating,
    updateStatus,
    isUpdatingStatus,
    isBatchProcessing,
    updateRound,
    isUpdatingRound,
    deleteMatch,
    isDeletingMatch,
  };
}
