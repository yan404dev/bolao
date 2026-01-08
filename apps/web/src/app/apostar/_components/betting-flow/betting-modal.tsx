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
        <div>
          <Button
            type="submit"
            form="aposta-form"
            className="w-full h-12 text-base rounded-xl bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20 disabled:opacity-50"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSubmitting ? "Enviando..." : isValid ? "Finalizar Aposta" : `Preencha tudo (${progresso})`}
          </Button>
          <p className="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            Seus dados estão protegidos
          </p>
        </div>
      }
    >
      <Form {...form}>
        <form id="aposta-form" onSubmit={handleSubmit} className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Seus Palpites</p>
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded-full ${palpitesPreenchidos === totalJogos ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
                }`}
            >
              {progresso}
            </span>
          </div>

          <div className="space-y-3">
            {jogos.map((jogo) => (
              <MatchRow key={jogo.id} jogo={jogo} form={form} />
            ))}
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Seus Dados</p>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...field}
                          type="text"
                          placeholder="Seu nome"
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
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
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          {...field}
                          type="tel"
                          placeholder="Seu WhatsApp"
                          className="w-full pl-9 pr-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 text-sm"
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
