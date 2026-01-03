"use client";

import Link from "next/link";
import { Calendar, Users, Trophy } from "lucide-react";
import { useRodadasEncerradasModel } from "./rodadas-encerradas.model";

export function RodadasEncerradas() {
  const { rodadas } = useRodadasEncerradasModel();

  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Rodadas Encerradas
          </h2>
          <Link href="/rodadas" className="text-green-600 hover:text-green-700 text-sm font-medium hover:underline">
            Ver todas
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rodadas.map((rodada) => (
            <Link key={rodada.id} href={`/rodada/${rodada.id}`}>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all cursor-pointer group h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-gray-400">#{rodada.id}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {rodada.data}
                  </span>
                </div>

                <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors mb-4 line-clamp-2">
                  {rodada.titulo}
                </h3>

                <div className="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span>{rodada.bilhetes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-600">
                    <Trophy className="w-4 h-4" />
                    <span className="truncate max-w-[80px]">{rodada.vencedor}</span>
                  </div>
                  <span className="font-semibold text-green-600">
                    {rodada.premio}
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
