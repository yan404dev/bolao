"use client";

import { useRankingTable } from "@/app/ranking/_components/ranking-table/hooks";
import { RankingTableRoundHeader, RankingTableRow, RankingTableEmpty, RankingTableLoader } from "./_components";

interface RankingTableProps {
  roundId?: number;
}

export function RankingTable({ roundId }: RankingTableProps) {
  const { round, ranking, isLoading, hasNoRound } = useRankingTable(roundId);

  if (isLoading) return <RankingTableLoader />;
  if (hasNoRound || !round) return <RankingTableEmpty />;

  return (
    <div>
      <RankingTableRoundHeader round={round} />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {ranking.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            No bets registered in this round.
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
                    Bettor
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exact
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Winner
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ranking.map((bettor) => (
                  <RankingTableRow key={bettor.ticketCode} bettor={bettor} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
        <span><strong className="text-green-600">Exact:</strong> Correct score (+3 pts)</span>
        <span><strong className="text-gray-600">Winner:</strong> Correct winner (+1 pt)</span>
      </div>
    </div>
  );
}
