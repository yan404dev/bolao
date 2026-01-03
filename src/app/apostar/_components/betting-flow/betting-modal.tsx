"use client";

import { useBettingForm } from "./use-betting-form";
import { User, Phone, Check, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Modal } from "@/shared/components/ui/modal";
import { Form, FormField, FormItem, FormControl } from "@/shared/components/ui/form";

interface BettingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BettingModal({ isOpen, onClose }: BettingModalProps) {
  const { form, jogos, progresso, palpitesPreenchidos, totalJogos, onSubmit } = useBettingForm();
  const isValid = form.formState.isValid;

  const footerContent = (
    <div>
      <Button
        type="submit"
        form="aposta-form"
        className="w-full h-12 text-base rounded-xl bg-green-600 hover:bg-green-700 shadow-lg shadow-green-600/20"
        disabled={!isValid}
      >
        {isValid && "Finalizar Aposta"}
        {!isValid && `Preencha tudo (${progresso})`}
      </Button>
      <p className="text-center text-[10px] text-gray-400 mt-2 flex items-center justify-center gap-1">
        <ShieldCheck className="w-3 h-3" />
        Seus dados estão protegidos
      </p>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Fazer Aposta" footer={footerContent}>
      <Form {...form}>
        <form id="aposta-form" onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Seus Palpites</p>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${palpitesPreenchidos === totalJogos ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
              {progresso}
            </span>
          </div>

          <div className="space-y-3">
            {jogos.map((jogo) => (
              <div key={jogo.id} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <img src={jogo.timeCasaImg} alt={jogo.timeCasa} className="w-8 h-8 object-contain" />
                    <span className="text-[10px] font-medium text-gray-700 text-center leading-tight truncate max-w-full">{jogo.timeCasa}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FormField
                      control={form.control}
                      name={`palpites.${jogo.id}.casa`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              {...field}
                              value={field.value || ""}
                              type="tel"
                              inputMode="numeric"
                              maxLength={1}
                              className="w-9 h-10 text-center text-lg font-bold bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                              onChange={(e) => {
                                if (/^\d?$/.test(e.target.value)) field.onChange(e.target.value);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <span className="text-gray-300 text-xs">x</span>
                    <FormField
                      control={form.control}
                      name={`palpites.${jogo.id}.visitante`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <input
                              {...field}
                              value={field.value || ""}
                              type="tel"
                              inputMode="numeric"
                              maxLength={1}
                              className="w-9 h-10 text-center text-lg font-bold bg-white border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                              onChange={(e) => {
                                if (/^\d?$/.test(e.target.value)) field.onChange(e.target.value);
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1 flex flex-col items-center gap-1">
                    <img src={jogo.timeVisitanteImg} alt={jogo.timeVisitante} className="w-8 h-8 object-contain" />
                    <span className="text-[10px] font-medium text-gray-700 text-center leading-tight truncate max-w-full">{jogo.timeVisitante}</span>
                  </div>
                </div>
              </div>
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
