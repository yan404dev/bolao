"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { Loader2 } from "lucide-react";
import dayjs from "dayjs";

interface RoundHeaderProps {
  roundId: number;
}

export function RoundHeader({ roundId }: RoundHeaderProps) {
  const { round, isLoading } = useRoundQueries(roundId);

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24 mb-2" />
        <div className="h-8 bg-gray-200 rounded w-64 mb-2" />
        <div className="h-4 bg-gray-100 rounded w-48" />
      </div>
    );
  }

  if (!round) return null;

  const statusStyles: Record<string, string> = {
    OPEN: "bg-blue-100 text-blue-700",
    LIVE: "bg-red-100 text-red-700",
    CLOSED: "bg-gray-100 text-gray-600",
  };

  const statusLabels: Record<string, string> = {
    OPEN: "Open",
    LIVE: "🔴 Live",
    CLOSED: "Closed",
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full mb-2 ${statusStyles[round.status] || statusStyles.CLOSED}`}>
            {statusLabels[round.status] || "Closed"}
          </span>
          <h1 className="text-xl font-bold text-gray-900">{round.title}</h1>
          <p className="text-sm text-gray-500 mt-1">
            {dayjs(round.startDate).format("DD/MM/YYYY")} — {round.endDate ? dayjs(round.endDate).format("DD/MM/YYYY") : "Ongoing"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">{formatCurrency(round.prizePool || 0)}</p>
          <p className="text-xs text-gray-500">Total Prize</p>
        </div>
      </div>
    </div>
  );
}
