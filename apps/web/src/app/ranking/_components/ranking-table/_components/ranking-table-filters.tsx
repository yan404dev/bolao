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
  { label: "All Points", value: "all" },
  { label: "5+ points", value: "5" },
  { label: "10+ points", value: "10" },
  { label: "15+ points", value: "15" },
  { label: "20+ points", value: "20" },
];

export function RankingTableFilters({
  filters,
  onFiltersChange,
}: RankingTableFiltersProps) {
  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row gap-3 items-end sm:items-center">
        <div className="w-full sm:w-1/3 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 z-10" />
          <Input
            placeholder="Search by name or ticket..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
            className="pl-10 h-10 border-gray-200 bg-white focus-visible:ring-green-500"
          />
        </div>

        <Select
          value={filters.minPoints}
          onValueChange={(value) => onFiltersChange({ ...filters, minPoints: value })}
        >
          <SelectTrigger className="w-full sm:w-[160px] h-10 border-gray-200 bg-white focus:ring-green-500 flex items-center">
            <SelectValue placeholder="Filter by points" />
          </SelectTrigger>
          <SelectContent>
            {POINTS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
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
