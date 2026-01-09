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
        emptyMessage="NENHUM RESULTADO PARA ESTA BUSCA."
        pagination={{
          currentPage: page,
          totalPages: pagination.totalPages,
          onPageChange: setPage
        }}
      />

      <div className="mt-8 flex flex-wrap items-center gap-8 text-[11px] font-black uppercase tracking-widest text-black/60 bg-gray-50 p-4 border-2 border-black border-dashed">
        <span className="flex items-center gap-3">
          <div className="w-3 h-3 bg-yellow-400 border border-black" />
          PLACAR EXATO (+3 PONTOS)
        </span>
        <span className="flex items-center gap-3">
          <div className="w-3 h-3 bg-gray-300 border border-black" />
          VENCEDOR E SALDO (+1 PONTO)
        </span>
      </div>
    </div>
  );
}
