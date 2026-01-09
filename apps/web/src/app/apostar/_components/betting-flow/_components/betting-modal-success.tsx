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
    <Modal isOpen={isOpen} onClose={onClose} title="BOOOOORA! APOSTA CONFIRMADA 🚀">
      <div className="p-8 text-center space-y-8 bg-white">
        <div className="w-24 h-24 bg-yellow-400 border-4 border-black mx-auto flex items-center justify-center brutalist-shadow rotate-3 shadow-black">
          <Trophy className="w-12 h-12 text-black" />
        </div>

        <div className="space-y-2">
          <h3 className="text-3xl font-black uppercase italic tracking-tighter text-black">
            PARABÉNS, {betResult.name.split(' ')[0]}!
          </h3>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
            Sua aposta foi registrada com sucesso absoluto.
          </p>
        </div>

        <div className="bg-black border-4 border-black p-6 brutalist-shadow-yellow transform -rotate-1">
          <p className="text-xs font-black text-yellow-400 uppercase tracking-widest mb-3">SEU CÓDIGO DO BILHETE</p>
          <div className="flex items-center justify-center gap-4 bg-white border-2 border-black p-4">
            <span className="text-4xl font-black text-black font-mono tracking-tighter">{betResult.ticketCode}</span>
            <button
              onClick={onCopyTicket}
              className="p-3 bg-yellow-400 border-2 border-black hover:bg-black hover:text-white transition-all active:scale-90"
              title="Copiar Código"
            >
              {copied ? <CheckCircle className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
            </button>
          </div>
          <p className="text-[10px] font-bold text-white uppercase tracking-widest mt-4 opacity-70">
            GUARDE ESTE CÓDIGO PARA REIVINDICAR SEU PRÊMIO
          </p>
        </div>

        <Button
          onClick={onClose}
          className="w-full h-16 text-2xl font-black uppercase italic tracking-tighter bg-black text-white border-4 border-black brutalist-shadow-yellow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
        >
          FECHAR E ACOMPANHAR
        </Button>
      </div>
    </Modal>
  );
}
