"use client";

import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { useMemo, useEffect } from "react";

export function useRankingFilterState() {
  const [search, setSearch] = useQueryState("search", parseAsString.withDefault("").withOptions({ shallow: false, throttleMs: 500 }));
  const [minPoints, setMinPoints] = useQueryState("minPoints", parseAsString.withDefault("all").withOptions({ shallow: false }));
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(0).withOptions({ shallow: false }));

  const filters = useMemo(() => ({
    search: search || undefined,
    minPoints: minPoints === "all" ? undefined : Number(minPoints),
    page,
    size: 20
  }), [search, minPoints, page]);
  useEffect(() => {
    setPage(0);
  }, [search, minPoints, setPage]);

  return {
    search,
    setSearch,
    minPoints,
    setMinPoints,
    page,
    setPage,
    filters,
  };
}
