"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { Zap } from "lucide-react";

interface RoundTitleProps {
  roundId: number;
}

export function RoundTitle({ roundId }: RoundTitleProps) {
  const { round, isLoading } = useRoundQueries(roundId);

  const getRoundNumber = () => {
    if (!round?.externalRoundId) return roundId.toString();
    const match = round.externalRoundId.match(/(\d+)$/);
    return match ? match[1] : roundId.toString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 animate-pulse">
        <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 shrink-0" />
        <div className="h-10 bg-gray-200 rounded w-48" />
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-tight sm:leading-none flex flex-wrap items-center gap-2 sm:gap-3">
        <Zap className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-500 shrink-0" />
        Rodada <span className="text-yellow-400 whitespace-nowrap">#{getRoundNumber()}</span>
      </h1>
      <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs mt-1 sm:mt-2 ml-0 sm:ml-1 line-clamp-1 sm:line-clamp-none">
        Detalhes e classificação
      </p>
    </>
  );
}
