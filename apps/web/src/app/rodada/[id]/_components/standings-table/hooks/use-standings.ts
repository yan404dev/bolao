"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/lib/api";
import { StandingEntity } from "@/shared/entities";



export function useStandings() {
  return useQuery({
    queryKey: ["standings"],
    queryFn: async () => {
      const { data } = await api.get<{ data: StandingEntity[] }>("/standings");
      return data.data;
    },
  });
}
