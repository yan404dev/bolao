"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import Link from "next/link";
import { useClosedRounds } from "./hooks/use-closed-rounds";
import { formatDate } from "@/shared/lib/utils";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function ClosedRounds() {
  const { rounds, isLoading } = useClosedRounds();

  if (isLoading) {
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

  if (rounds.length === 0) return null;

  return (
    <section className="w-full py-12 px-4 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-2 bg-black" />
          <h2 className="text-3xl font-black uppercase italic tracking-tight text-gray-900 leading-none">
            Rodadas <span className="text-gray-500 underline decoration-yellow-400 decoration-4 underline-offset-8">Encerradas</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rounds.map((round) => (
            <Link
              key={round.id}
              href={`/rodada/${round.id}`}
              className="group"
            >
              <Card className="h-full brutalist-card overflow-hidden">
                <div className="bg-black text-white px-4 py-2 flex justify-between items-center bg-gray-900">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400 bg-black px-2 py-0.5 border border-yellow-400">Finalizada</span>
                  <span className="text-[10px] font-bold text-gray-400 italic">{formatDate(round.endDate || round.createdAt)}</span>
                </div>

                <CardHeader className="pb-4 pt-6">
                  <CardTitle className="text-2xl font-black uppercase italic tracking-tighter text-gray-900 group-hover:text-yellow-600 transition-colors">
                    {round.title}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-2 gap-4 pt-6 border-t border-dashed border-black mt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                        Apostas
                      </span>
                      <span className="text-xl font-black text-black italic">
                        {round.totalTickets || 0}
                      </span>
                    </div>
                    <div className="flex flex-col border-l-2 border-black pl-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
                        Prêmio Total
                      </span>
                      <span className="text-xl font-black text-yellow-500 italic">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format((round.prizePool || 0) / 100)}
                      </span>
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
