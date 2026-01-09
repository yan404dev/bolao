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

      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-gray-500">
        <span><strong className="text-green-600">Exact:</strong> Correct score (+3 pts)</span>
        <span><strong className="text-gray-600">Winner:</strong> Correct winner (+1 pt)</span>
      </div>
    </div>
  );
}
