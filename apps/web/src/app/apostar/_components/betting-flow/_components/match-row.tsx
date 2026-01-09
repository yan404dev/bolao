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
    <div className="bg-white border-2 border-black p-4 brutalist-shadow-yellow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
      <div className="flex items-center gap-4">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-50 border-2 border-black flex items-center justify-center p-2">
            <img src={jogo.timeCasaImg} alt={jogo.timeCasa} className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-black uppercase italic text-black text-center leading-none truncate max-w-full">
            {jogo.timeCasa}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ScoreInput form={form} name={`palpites.${jogo.id}.casa`} />
          <span className="text-black font-black italic text-xl">X</span>
          <ScoreInput form={form} name={`palpites.${jogo.id}.visitante`} />
        </div>

        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-gray-50 border-2 border-black flex items-center justify-center p-2">
            <img src={jogo.timeVisitanteImg} alt={jogo.timeVisitante} className="w-full h-full object-contain" />
          </div>
          <span className="text-xs font-black uppercase italic text-black text-center leading-none truncate max-w-full">
            {jogo.timeVisitante}
          </span>
        </div>
      </div>
    </div>
  );
}
