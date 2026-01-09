"use client";

import { useBettingModal } from "./hooks";
import { User, Phone, ShieldCheck, Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";
import { Form, FormField, FormItem, FormControl } from "@/shared/components/ui/form";
import { BettingModalSuccess } from "./_components/betting-modal-success";
import { BettingModalLoading } from "./_components/betting-modal-loading";
import { BettingModalEmpty } from "./_components/betting-modal-empty";
import { MatchRow } from "./_components/match-row";

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BettingModal({ isOpen, onClose }: BettingModalProps) {
  const {
    form,
    jogos,
    progresso,
    palpitesPreenchidos,
    totalJogos,
    isValid,
    handleSubmit,
    isLoadingRound,
    activeRound,
    isSubmitting,
    betResult,
    isSuccess,
    copied,
    handleCopyTicket,
    handleClose,
  } = useBettingModal(onClose);

  if (isSuccess && betResult) {
    return (
      <BettingModalSuccess
        isOpen={isOpen}
        onClose={handleClose}
        betResult={betResult}
        copied={copied}
        onCopyTicket={handleCopyTicket}
      />
    );
  }

  if (isLoadingRound) {
    return <BettingModalLoading isOpen={isOpen} onClose={handleClose} />;
  }

  if (!activeRound || jogos.length === 0) {
    return <BettingModalEmpty isOpen={isOpen} onClose={handleClose} />;
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={activeRound.title}
      footer={
        <div className="space-y-4">
          <Button
            type="submit"
            form="aposta-form"
            className="w-full h-16 text-2xl font-black uppercase italic tracking-tighter bg-yellow-400 text-black border-4 border-black brutalist-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting && <Loader2 className="w-6 h-6 mr-3 animate-spin" />}
            {isSubmitting ? "ENVIANDO..." : isValid ? "FINALIZAR APOSTA" : `FALTAM PALPITES (${progresso})`}
          </Button>
          <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-black" />
            SEUS DADOS ESTÃO PROTEGIDOS PELO BOLÃOJC
          </p>
        </div>
      }
    >
      <Form {...form}>
        <form id="aposta-form" onSubmit={handleSubmit} className="p-6 space-y-8">
          <div className="flex items-center justify-between border-b-4 border-black pb-4">
            <p className="text-lg font-black uppercase italic tracking-tighter text-black">Seus Palpites</p>
            <span
              className={`text-sm font-black uppercase italic px-4 py-1 border-2 border-black brutalist-shadow ${palpitesPreenchidos === totalJogos ? "bg-yellow-400 text-black" : "bg-white text-black"
                }`}
            >
              {progresso}
            </span>
          </div>

          <div className="space-y-6">
            {jogos.map((jogo) => (
              <MatchRow key={jogo.id} jogo={jogo} form={form} />
            ))}
          </div>

          <div className="space-y-6 pt-4 border-t-4 border-black">
            <p className="text-lg font-black uppercase italic tracking-tighter text-black">Seus Dados</p>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1 border border-black bg-yellow-400">
                          <User className="w-4 h-4 text-black" />
                        </div>
                        <input
                          {...field}
                          type="text"
                          placeholder="DIGITE SEU NOME"
                          className="w-full pl-14 pr-4 py-4 bg-white border-2 border-black font-black uppercase italic placeholder:text-gray-300 focus:outline-none focus:bg-yellow-50 focus:brutalist-shadow transition-all"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1 border border-black bg-yellow-400">
                          <Phone className="w-4 h-4 text-black" />
                        </div>
                        <input
                          {...field}
                          type="tel"
                          placeholder="SEU WHATSAPP"
                          className="w-full pl-14 pr-4 py-4 bg-white border-2 border-black font-black uppercase italic placeholder:text-gray-300 focus:outline-none focus:bg-yellow-50 focus:brutalist-shadow transition-all"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
