"use client";

import { Trophy, Copy, CheckCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";

interface BettingModalSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  betResult: {
    name: string;
    ticketCode: string;
  };
  copied: boolean;
  onCopyTicket: () => void;
}

export function BettingModalSuccess({
  isOpen,
  onClose,
  betResult,
  copied,
  onCopyTicket,
}: BettingModalSuccessProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Aposta Confirmada! 🎉">
      <div className="p-6 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full mx-auto flex items-center justify-center">
          <Trophy className="w-10 h-10 text-green-600" />
        </div>

        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Parabéns, {betResult.name}!</h3>
          <p className="text-gray-600">Sua aposta foi registrada com sucesso.</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Código do Bilhete</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold text-green-600 font-mono">{betResult.ticketCode}</span>
            <button onClick={onCopyTicket} className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
              {copied ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Guarde este código para consultar sua aposta</p>
        </div>

        <Button onClick={onClose} className="w-full h-12 text-base rounded-xl bg-green-600 hover:bg-green-700">
          Fechar
        </Button>
      </div>
    </Modal>
  );
}
