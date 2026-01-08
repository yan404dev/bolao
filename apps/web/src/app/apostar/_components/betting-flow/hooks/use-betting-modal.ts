"use client";

import { useState } from "react";
import { useBettingQueries } from "./use-betting-queries";
import { useBettingForm } from "./use-betting-form";
import { BettingFormData } from "../betting-modal.schema";
import { MatchEntity } from "@/shared/entities";

export function useBettingModal(onClose: () => void) {
  const [copied, setCopied] = useState(false);
  const {
    activeRound,
    isLoadingRound,
    createBetMutation
  } = useBettingQueries();

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
    const ticketCode = createBetMutation.data?.ticketCode;
    if (ticketCode) {
      await navigator.clipboard.writeText(ticketCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setCopied(false);
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
    betResult: createBetMutation.data,
    copied,
    handleCopyTicket,
    handleClose,
  };
}
