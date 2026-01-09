"use client";

import { Trophy } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";

interface BettingModalEmptyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BettingModalEmpty({ isOpen, onClose }: BettingModalEmptyProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="AVISO IMPORTANTE">
      <div className="p-12 text-center space-y-8 bg-white">
        <div className="w-24 h-24 bg-gray-100 border-4 border-black mx-auto flex items-center justify-center brutalist-shadow">
          <Trophy className="w-12 h-12 text-gray-400" />
        </div>
        <div className="space-y-4">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-black leading-none">NENHUMA RODADA ABERTA</h3>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest leading-relaxed">
            NÃO HÁ RODADA DISPONÍVEL PARA APOSTAS NO MOMENTO. VOLTE MAIS TARDE PARA O JOGO!
          </p>
        </div>
        <Button
          onClick={onClose}
          className="w-full h-16 text-2xl font-black uppercase italic tracking-tighter bg-black text-white border-4 border-black brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          FECHAR AGORA
        </Button>
      </div>
    </Modal>
  );
}
