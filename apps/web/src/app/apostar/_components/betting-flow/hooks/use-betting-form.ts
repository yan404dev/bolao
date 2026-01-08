"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { bettingFormSchema, BettingFormData } from "../betting-modal.schema";
import { MatchEntity } from "@/shared/entities";

interface UseBettingFormParams {
  matches: MatchEntity[];
  onSubmit: (data: BettingFormData) => Promise<void>;
}

export function useBettingForm({ matches, onSubmit }: UseBettingFormParams) {
  const form = useForm<BettingFormData>({
    resolver: zodResolver(bettingFormSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      palpites: {},
    },
    mode: "onChange",
  });

  const palpites = form.watch("palpites");
  const isValid = form.formState.isValid;

  const palpitesPreenchidos = matches.filter(
    (match) => palpites[match.id]?.casa && palpites[match.id]?.visitante
  ).length;

  const totalJogos = matches.length;
  const progresso = `${palpitesPreenchidos}/${totalJogos}`;

  const handleSubmit = form.handleSubmit(onSubmit);

  return {
    form,
    isValid,
    palpitesPreenchidos,
    totalJogos,
    progresso,
    handleSubmit,
  };
}
