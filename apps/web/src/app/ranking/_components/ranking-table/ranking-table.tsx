"use client";

import { useRankingTable } from "./hooks";
import {
  RankingTableLoader,
  RankingTableEmpty,
  RankingTableRoundHeader,
  RankingTableRow
} from "./_components";

interface RankingTableProps {
  roundId?: number;
}

export function RankingTable({ roundId }: RankingTableProps) {
  const { rodada, ranking, isLoading, hasNoRound } = useRankingTable(roundId);

  if (isLoading) return <RankingTableLoader />;
  if (hasNoRound || !rodada) return <RankingTableEmpty />;

  return (
    <div>
      <RankingTableRoundHeader rodada={rodada} />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {ranking.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            Nenhuma aposta registrada nesta rodada.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Apostador
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bilhete
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exatos
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vencedor
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pontos
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ranking.map((apostador) => (
                  <RankingTableRow key={apostador.numeroBilhete} apostador={apostador} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
        <span><strong className="text-green-600">Exatos:</strong> Acertou o placar (+3 pts)</span>
        <span><strong className="text-gray-600">Vencedor:</strong> Acertou quem ganhou (+1 pt)</span>
      </div>
    </div>
  );
}
