"use client";

import { UseFormReturn } from "react-hook-form";
import { BettingFormData } from "../betting-modal.schema";
import { ScoreInput } from "./score-input";

interface MatchRowProps {
  jogo: {
    id: number;
    timeCasa: string;
    timeCasaImg: string;
    timeVisitante: string;
    timeVisitanteImg: string;
  };
  form: UseFormReturn<BettingFormData>;
}

export function MatchRow({ jogo, form }: MatchRowProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
      <div className="flex items-center gap-3">
        <div className="flex-1 flex flex-col items-center gap-1">
          <img src={jogo.timeCasaImg} alt={jogo.timeCasa} className="w-8 h-8 object-contain" />
          <span className="text-[10px] font-medium text-gray-700 text-center leading-tight truncate max-w-full">
            {jogo.timeCasa}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <ScoreInput form={form} name={`palpites.${jogo.id}.casa`} />
          <span className="text-gray-300 text-xs">x</span>
          <ScoreInput form={form} name={`palpites.${jogo.id}.visitante`} />
        </div>

        <div className="flex-1 flex flex-col items-center gap-1">
          <img src={jogo.timeVisitanteImg} alt={jogo.timeVisitante} className="w-8 h-8 object-contain" />
          <span className="text-[10px] font-medium text-gray-700 text-center leading-tight truncate max-w-full">
            {jogo.timeVisitante}
          </span>
        </div>
      </div>
    </div>
  );
}
