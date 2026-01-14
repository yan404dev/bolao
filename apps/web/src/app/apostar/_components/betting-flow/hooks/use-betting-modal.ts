"use client";

import { useState } from "react";
import { useBettingQueries, useBetStatus } from "./use-betting-queries";
import { useBettingForm } from "./use-betting-form";
import { BettingFormData } from "../betting-modal.schema";
import { MatchEntity } from "@/shared/entities";

export function useBettingModal(onClose: () => void) {
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

  const handleCreateBet = async (data: BettingFormData) => {
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
  };

  const formHook = useBettingForm({
    matches,
    onSubmit: handleCreateBet,
  });

  const handleCopyTicket = async () => {
    const ticketCode = createBetMutation.data?.bet?.ticketCode;
    if (ticketCode) {
      await navigator.clipboard.writeText(ticketCode);
      setCopiedTicket(true);
      setTimeout(() => setCopiedTicket(false), 2000);
    }
  };

  const handleCopyPix = async () => {
    const pixCode = createBetMutation.data?.payment?.pixCopyPaste;
    if (pixCode) {
      await navigator.clipboard.writeText(pixCode);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 2000);
    }
  };

  const handleClose = () => {
    setCopiedTicket(false);
    setCopiedPix(false);
    onClose();
  };

  const mapMatchToJogo = (match: MatchEntity) => ({
    id: match.id,
    timeCasa: match.homeTeam,
    timeCasaImg: match.homeTeamLogo || "/placeholder-team.png",
    timeVisitante: match.awayTeam,
    timeVisitanteImg: match.awayTeamLogo || "/placeholder-team.png",
  });

  return {
    ...formHook,
    jogos: matches.map(mapMatchToJogo),
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
