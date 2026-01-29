"use client";

import { Trophy } from "lucide-react";
import { RoundStatus } from "@/shared/entities/round.entity";
import { roundStatusLabels, roundStatusStyles } from "@/shared/constants";

export interface RoundInfo {
  id: number;
  title: string;
  status: RoundStatus;
  startTime: string;
}

interface RankingTableRoundHeaderProps {
  round: RoundInfo;
}

export function RankingTableRoundHeader({ round }: RankingTableRoundHeaderProps) {
  return (
    <div className="border-b border-black pb-8 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white p-3 rotate-3 border border-yellow-400">
            <Trophy className="w-6 h-6 text-yellow-500" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className={`px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] border border-black ${roundStatusStyles[round.status]}`}>
                {round.status === "LIVE" ? "🔴 AO VIVO" : roundStatusLabels[round.status]}
              </span>
            </div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-black leading-none">{round.title}</h2>
          </div>
        </div>
        <div className="md:text-right border-l md:border-l-0 md:border-r border-black pl-4 md:pl-0 md:pr-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">INÍCIO DA RODADA</p>
          <p className="text-xl font-black text-black italic leading-none">{round.startTime}</p>
        </div>
      </div>
    </div>
  );
}
