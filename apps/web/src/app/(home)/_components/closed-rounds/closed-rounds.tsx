"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { useClosedRounds } from "./hooks/use-closed-rounds";
import { formatDate, formatCurrency, extractRoundNumber, cn } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/components/ui/skeleton";

function ClosedRoundsLoading() {
  return (
    <section className="w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Skeleton className="h-10 w-64 mb-8 bg-gray-200" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 w-full rounded-2xl bg-gray-100" />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ClosedRounds() {
  const { rounds, isLoading } = useClosedRounds();

  if (isLoading) return <ClosedRoundsLoading />;

  if (rounds.length === 0) return null;

  return (
    <section className="w-full py-16 px-4 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 -rotate-12 translate-x-32 -translate-y-32" />

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-1 lg:h-2 w-12 bg-yellow-400" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-400">Desafios de Elite</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-black leading-none">
            PRÓXIMAS <span className="text-yellow-400 underline decoration-black/10 decoration-8 underline-offset-[12px]">RODADAS</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {rounds.map((round) => (
            <Link
              key={round.externalRoundId}
              href={`/rodada/${round.externalRoundId}`}
              className="group"
            >
              <Card className="h-full brutalist-card overflow-hidden group-hover:shadow-[12px_12px_0px_0px_rgba(251,191,36,1)] transition-all">
                <div className="bg-black text-white px-5 py-3 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      round.status === 'OPEN' ? "bg-yellow-400 animate-pulse" : "bg-gray-500"
                    )} />
                    <span className={cn(
                      "text-[10px] font-black uppercase tracking-widest",
                      round.status === 'OPEN' ? "text-yellow-400" : "text-gray-400"
                    )}>
                      {round.status === 'OPEN' ? 'Inscrições Abertas' : 'Em Breve'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-white/40 italic">Início: {formatDate(round.startDate)}</span>
                </div>

                <CardHeader className="pb-4 pt-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/30 border-l-2 border-yellow-400 pl-2">
                      {round.championshipTitle} - Rodada {extractRoundNumber(round.externalRoundId)}
                    </span>
                  </div>
                  <CardTitle className="text-3xl font-black uppercase italic tracking-tighter text-gray-900 leading-[1.1] group-hover:text-yellow-600 transition-colors">
                    {round.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="pb-8">
                  <div className="mt-8 flex items-center justify-between group-hover:translate-x-2 transition-transform">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Prêmio Estimado</span>
                      <span className="text-2xl font-black text-black italic leading-none">
                        {formatCurrency(round.prizePool || 0)}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-black flex items-center justify-center group-hover:bg-yellow-400 transition-colors">
                      <MoveRight className="w-6 h-6 text-white group-hover:text-black" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
