"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { RoundEntity } from "@/shared/entities";
import Link from "next/link";
import { Trophy, Calendar as CalendarIcon, Users } from "lucide-react";
import dayjs from "dayjs";
import { formatCurrency } from "@/shared/lib/utils";

interface RoundCardProps {
  round: RoundEntity;
  index: number;
}

export function RoundCard({ round, index }: RoundCardProps) {
  const statusColors = {
    OPEN: "bg-yellow-400 text-black",
    LIVE: "bg-red-600 text-white animate-pulse",
    CLOSED: "bg-gray-900 text-white",
    CALCULATED: "bg-blue-600 text-white",
    CANCELLED: "bg-red-100 text-red-600",
  };

  const statusLabels = {
    OPEN: "Aberta",
    LIVE: "Ao Vivo",
    CLOSED: "Encerrada",
    CALCULATED: "Finalizada",
    CANCELLED: "Cancelada",
  };

  return (
    <Link href={`/rodada/${round.externalRoundId}`}>
      <Card
        className="group relative overflow-hidden border-4 border-black rounded-none hover:bg-yellow-50 transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white cursor-pointer h-full"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
          <span className="text-7xl font-black italic">{round.externalRoundId}</span>
        </div>

        <CardHeader className="pb-4 border-b-4 border-black bg-gray-50 group-hover:bg-yellow-100 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-2 border-black ${statusColors[round.status]}`}>
              {statusLabels[round.status]}
            </span>
          </div>
          <CardTitle className="text-xl font-black uppercase italic text-black tracking-tighter leading-none">
            {round.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-tighter text-gray-600">
            <CalendarIcon className="w-4 h-4 text-black" />
            <span>Início: {dayjs(round.startDate).format("DD/MM/YYYY")}</span>
          </div>

          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-tighter text-yellow-600">
            <Trophy className="w-4 h-4 text-black" />
            <span>Prêmio: {formatCurrency(round.prizePool || 0)}</span>
          </div>

          <div className="flex items-center gap-3 text-sm font-bold uppercase tracking-tighter text-gray-600">
            <Users className="w-4 h-4 text-black" />
            <span>{round.totalTickets} Palpites Registrados</span>
          </div>

          <div className="pt-4 flex items-center gap-2">
            <div className="h-4 w-4 bg-black -skew-x-12" />
            <span className="text-[10px] font-black uppercase italic tracking-widest bg-black text-white px-2 py-0.5">Clique para Ver Detalhes</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
