"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import Link from "next/link";
import { useClosedRounds } from "./hooks/use-closed-rounds";
import { formatDate } from "@/shared/lib/utils";

export function ClosedRounds() {
  const { rounds, isLoading } = useClosedRounds();

  if (isLoading) {
    return (
      <section className="w-full py-8">
        <div className="container mx-auto px-4">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-48 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (rounds.length === 0) return null;

  return (
    <section className="w-full py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Rodadas Encerradas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rounds.map((round) => (
            <Link
              key={round.id}
              href={`/rodada/${round.id}`}
              className="group block"
            >
              <Card className="h-full hover:shadow-md transition-all flex flex-col">
                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-lg font-bold group-hover:text-amber-600 transition-colors">
                      {round.title}
                    </CardTitle>
                    <p className="text-sm text-gray-500">
                      {formatDate(round.endDate || round.createdAt)}
                    </p>
                  </div>
                  <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-600">
                    Encerrada
                  </div>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-50 text-sm">
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                        Bilhetes
                      </span>
                      <span className="font-medium">{round.totalTickets}</span>
                    </div>
                    <div className="w-px h-8 bg-gray-100" />
                    <div className="flex flex-col">
                      <span className="text-gray-500 text-xs uppercase font-semibold tracking-wider">
                        Premiação
                      </span>
                      <span className="font-medium text-green-600">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(round.prizePool / 100)}
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
