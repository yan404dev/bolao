"use client";

import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/ui/modal";

interface BettingModalLoadingProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BettingModalLoading({ isOpen, onClose }: BettingModalLoadingProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fazer Aposta">
      <div className="p-8 flex flex-col items-center justify-center gap-4">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        <p className="text-gray-600">Carregando jogos...</p>
      </div>
    </Modal>
  );
}
