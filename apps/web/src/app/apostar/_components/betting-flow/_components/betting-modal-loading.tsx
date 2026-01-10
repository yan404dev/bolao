"use client";

import { Loader2 } from "lucide-react";
import { Modal } from "@/shared/components/ui/modal";

interface BettingModalLoadingProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BettingModalLoading({ isOpen, onClose }: BettingModalLoadingProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="BOLÃOJC">
      <div className="p-12 flex flex-col items-center justify-center gap-6 bg-white">
        <div className="relative">
          <div className="absolute inset-0 bg-yellow-400 rotate-6 border border-black" />
          <div className="relative p-4 bg-black border border-black animate-pulse">
            <Loader2 className="w-10 h-10 text-yellow-400 animate-spin" />
          </div>
        </div>
        <p className="text-xl font-black uppercase italic tracking-tighter text-black">CARREGANDO JOGOS...</p>
      </div>
    </Modal>
  );
}
