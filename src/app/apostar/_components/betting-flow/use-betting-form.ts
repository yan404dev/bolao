"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apostaFormSchema, ApostaFormData, JOGOS } from "./betting-modal.schema";

export function useBettingForm() {
  const form = useForm<ApostaFormData>({
    resolver: zodResolver(apostaFormSchema),
    defaultValues: {
      nome: "",
      telefone: "",
      palpites: {},
    },
    mode: "onChange",
  });

  const palpites = form.watch("palpites");

  const palpitesPreenchidos = JOGOS.filter(
    (jogo) => palpites[jogo.id]?.casa && palpites[jogo.id]?.visitante
  ).length;

  const totalJogos = JOGOS.length;
  const progresso = `${palpitesPreenchidos}/${totalJogos}`;

  const onSubmit = (data: ApostaFormData) => {
    console.log("Aposta enviada:", data);
    alert("Aposta finalizada!");
  };

  return {
    form,
    jogos: JOGOS,
    palpitesPreenchidos,
    totalJogos,
    progresso,
    onSubmit,
  };
}
