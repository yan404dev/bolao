"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useBettingQueries, useBetStatus } from "./use-betting-queries";
import { useBettingForm } from "./use-betting-form";
import { BettingFormData } from "../betting-modal.schema";
import { MatchEntity } from "@/shared/entities";

const mapMatchToJogo = (match: MatchEntity) => ({
  id: match.id,
  timeCasa: match.homeTeam,
  timeCasaImg: match.homeTeamLogo || "/placeholder-team.png",
  timeVisitante: match.awayTeam,
  timeVisitanteImg: match.awayTeamLogo || "/placeholder-team.png",
});

export function useBettingModal(onClose: () => void) {
  const router = useRouter();
  const [copiedTicket, setCopiedTicket] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);

  const {
    activeRound,
    isLoadingRound,
    createBetMutation
  } = useBettingQueries();

  const betId = createBetMutation.data?.bet?.id;
  const { data: updatedBet } = useBetStatus(betId);

  const betResult = createBetMutation.data ? {
    ...createBetMutation.data,
    bet: updatedBet || createBetMutation.data.bet
  } : null;

  const matches = activeRound?.matches ?? [];

  const jogos = useMemo(() => matches.map(mapMatchToJogo), [matches]);

  const handleCreateBet = useCallback(async (data: BettingFormData) => {
    if (!activeRound) return;

    await createBetMutation.mutateAsync({
      roundId: activeRound.id,
      name: data.nome,
      phone: data.telefone,
      predictions: Object.entries(data.palpites).map(([matchId, scores]) => ({
        matchId: parseInt(matchId),
        homeScore: parseInt(scores.casa),
        awayScore: parseInt(scores.visitante),
      })),
    });
  }, [activeRound, createBetMutation]);

  const formHook = useBettingForm({
    matches,
    onSubmit: handleCreateBet,
  });

  const handleCopyTicket = useCallback(async () => {
    const ticketCode = createBetMutation.data?.bet?.ticketCode;
    if (ticketCode) {
      await navigator.clipboard.writeText(ticketCode);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  }, [createBetMutation.data?.bet?.ticketCode]);

  const handleCopyPix = useCallback(async () => {
    const pixCode = createBetMutation.data?.payment?.pixCopyPaste;
    if (pixCode) {
      await navigator.clipboard.writeText(pixCode);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    }
  }, [createBetMutation.data?.payment?.pixCopyPaste]);

  const handleClose = useCallback(() => {
    setCopiedTicket(false);
    setCopiedPix(false);

    if (activeRound?.externalRoundId) {
      router.push(`/rodada/${activeRound.externalRoundId}`);
    }

    onClose();
  }, [activeRound?.id, router, onClose]);

  return {
    ...formHook,
    jogos,
    activeRound,
    isLoadingRound,
    isSubmitting: createBetMutation.isPending,
    isSuccess: createBetMutation.isSuccess,
    betResult,
    copiedTicket,
    copiedPix,
    handleCopyTicket,
    handleCopyPix,
    handleClose,
  };
}
