"use client";

import { useQuery } from "@tanstack/react-query";
import { standingsService } from "@/shared/services";

export function useStandings() {
  return useQuery({
    queryKey: ["standings"],
    queryFn: () => standingsService.getAll(),
  });
}
