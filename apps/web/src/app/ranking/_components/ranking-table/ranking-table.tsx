"use client";

import { useRankingTable, useRankingFilterState } from "@/app/ranking/_components/ranking-table/hooks";
import {
  RankingTableRoundHeader,
  RankingTableEmpty,
  RankingTableLoader,
  RankingTableFilters,
} from "./_components";
import { DataTable } from "@/shared/components/ui/data-table";
import { columns } from "./columns";

interface RankingTableProps {
  roundId?: number;
}

export function RankingTable({ roundId }: RankingTableProps) {
  const {
    search, setSearch,
    minPoints, setMinPoints,
    page, setPage,
    filters
  } = useRankingFilterState();

  const {
    round,
    ranking,
    pagination,
    isLoading,
    isFetchingRanking,
    hasNoRound
  } = useRankingTable(roundId, filters);

  if (isLoading) return <RankingTableLoader />;
  if (hasNoRound || !round) return <RankingTableEmpty />;

  return (
    <div>
      <RankingTableRoundHeader round={round} />

      <RankingTableFilters
        filters={{ search, minPoints }}
        onFiltersChange={(f) => {
          setSearch(f.search);
          setMinPoints(f.minPoints);
        }}
      />

      <DataTable
        columns={columns}
        data={ranking}
        isLoading={isFetchingRanking}
        emptyMessage="No results matching your search."
        pagination={{
          currentPage: page,
          totalPages: pagination.totalPages,
          onPageChange: setPage
        }}
      />

      <div className="mt-8 flex flex-wrap items-center gap-6 text-[10px] font-black uppercase tracking-widest">
        <span className="flex items-center gap-2"><div className="w-2 h-2 bg-yellow-500" /> Placar Exato (+3 PTS)</span>
        <span className="flex items-center gap-2 text-gray-400"><div className="w-2 h-2 bg-gray-400" /> Vencedor (+1 PT)</span>
      </div>
    </div>
  );
}
