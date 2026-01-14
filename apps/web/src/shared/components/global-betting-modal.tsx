"use client";

import dynamic from "next/dynamic";
import { useBettingModalState } from "@/shared/providers/betting-modal-provider";
import { Skeleton } from "@/shared/components/ui/skeleton";

const BettingModal = dynamic(
  () => import("@/app/apostar/_components/betting-flow/betting-modal").then(mod => mod.BettingModal),
  {
    loading: () => <Skeleton className="fixed inset-0 bg-black/50" />,
    ssr: false
  }
);

export function GlobalBettingModal() {
  const { isOpen, closeModal } = useBettingModalState();

  if (!isOpen) return null;

  return (
    <BettingModal
      isOpen={isOpen}
      onClose={closeModal}
    />
  );
}
