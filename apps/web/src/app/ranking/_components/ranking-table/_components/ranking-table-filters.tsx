"use client";

import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import { Search } from "lucide-react";

interface RankingFilters {
  search: string;
  minPoints: string;
}

interface RankingTableFiltersProps {
  filters: RankingFilters;
  onFiltersChange: (filters: RankingFilters) => void;
}

const POINTS_OPTIONS = [
  { label: "TODOS OS PONTOS", value: "all" },
  { label: "MÍNIMO 5 PTS", value: "5" },
  { label: "MÍNIMO 10 PTS", value: "10" },
  { label: "MÍNIMO 15 PTS", value: "15" },
  { label: "MÍNIMO 20 PTS", value: "20" },
];

export function RankingTableFilters({
  filters,
  onFiltersChange,
}: RankingTableFiltersProps) {
  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-end sm:items-center">
        <div className="w-full sm:w-1/2 relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1 border border-black bg-yellow-400 z-10">
            <Search className="w-4 h-4 text-black" />
          </div>
          <Input
            placeholder="BUSCAR POR NOME OU BILHETE..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value.toUpperCase() })}
            className="pl-14 h-14 bg-white border-2 border-black font-black uppercase italic placeholder:text-gray-300 focus-visible:ring-0 focus-visible:bg-yellow-50 focus-visible:brutalist-shadow transition-all"
          />
        </div>

        <Select
          value={filters.minPoints}
          onValueChange={(value) => onFiltersChange({ ...filters, minPoints: value })}
        >
          <SelectTrigger className="w-full sm:w-[240px] h-14 bg-white border-2 border-black font-black uppercase italic tracking-widest focus:ring-0 hover:bg-yellow-50 brutalist-shadow transition-all">
            <SelectValue placeholder="PONTUAÇÃO MÍNIMA" />
          </SelectTrigger>
          <SelectContent className="border-2 border-black rounded-none">
            {POINTS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="font-black uppercase italic text-xs py-3 focus:bg-yellow-400 focus:text-black">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export type { RankingFilters };
