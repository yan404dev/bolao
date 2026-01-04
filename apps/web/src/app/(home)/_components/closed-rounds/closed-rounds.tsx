"use client";

import Link from "next/link";
import { useClosedRounds } from "./hooks/use-closed-rounds";
import { formatDate } from "@/shared/lib/utils";

export function ClosedRounds() {
  const { rounds, isLoading } = useClosedRounds();

  if (isLoading) {
    return (
      <section className="w-full py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl h-48 animate-pulse shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (rounds.length === 0) return null;

  return (
    <section className="w-full py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Rodadas Encerradas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rounds.map((round) => (
            <Link
              key={round.id}
              href={`/rodada/${round.id}`}
              className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-amber-600 transition-colors">
                    {round.title}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {formatDate(round.endDate || round.createdAt)}
                  </span>
                </div>
                <div className="bg-gray-100 px-2 py-1 rounded text-xs font-medium text-gray-600">
                  Encerrada
                </div>
              </div>

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-50 text-sm">
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
