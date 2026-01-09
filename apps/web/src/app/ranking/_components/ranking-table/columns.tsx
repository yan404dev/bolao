"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BettorEntity } from "@/shared/entities";

const getMedal = (position: number) => {
  switch (position) {
    case 1: return "🥇";
    case 2: return "🥈";
    case 3: return "🥉";
    default: return null;
  }
};

export const columns: ColumnDef<BettorEntity>[] = [
  {
    accessorKey: "position",
    header: "#",
    cell: ({ row }) => {
      const position = row.original.position;
      return (
        <span className="text-lg">
          {getMedal(position) || (
            <span className="text-gray-400 text-sm font-medium">{position}</span>
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Bettor",
    cell: ({ row }) => {
      const bettor = row.original;
      return (
        <span className={`font-medium ${bettor.position <= 3 ? "text-gray-900" : "text-gray-700"}`}>
          {bettor.name}
        </span>
      );
    },
  },
  {
    accessorKey: "ticketCode",
    header: "Ticket",
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">
            #{row.original.ticketCode}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "exactScores",
    header: () => <div className="text-center">Exact</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <span className="text-green-600 font-medium">{row.original.exactScores}</span>
      </div>
    ),
  },
  {
    accessorKey: "winnerScores",
    header: () => <div className="text-center">Winner</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <span className="text-gray-600">{row.original.winnerScores}</span>
      </div>
    ),
  },
  {
    accessorKey: "points",
    header: () => <div className="text-right">Points</div>,
    cell: ({ row }) => {
      const bettor = row.original;
      return (
        <div className="text-right">
          <span className={`font-bold ${bettor.position === 1
              ? "text-amber-600 text-lg"
              : bettor.position <= 3
                ? "text-gray-900"
                : "text-gray-700"
            }`}>
            {bettor.points}
          </span>
        </div>
      );
    },
  },
];
