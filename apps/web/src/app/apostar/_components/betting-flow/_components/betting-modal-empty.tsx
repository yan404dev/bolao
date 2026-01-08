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
    <Modal isOpen={isOpen} onClose={onClose} title="Fazer Aposta">
      <div className="p-8 text-center space-y-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto flex items-center justify-center">
          <Trophy className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">Nenhuma rodada aberta</h3>
        <p className="text-gray-600 text-sm">Não há rodada disponível para apostas no momento. Volte mais tarde!</p>
        <Button onClick={onClose} variant="outline" className="w-full">
          Fechar
        </Button>
      </div>
    </Modal>
  );
}
