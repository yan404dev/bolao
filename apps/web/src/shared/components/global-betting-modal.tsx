"use client";

import { useBettingModalState } from "@/shared/providers/betting-modal-provider";
import { BettingModal } from "@/app/apostar/_components/betting-flow/betting-modal";

export function GlobalBettingModal() {
  const { isOpen, closeModal } = useBettingModalState();

  return (
    <BettingModal
      isOpen={isOpen}
      onClose={closeModal}
    />
  );
}
