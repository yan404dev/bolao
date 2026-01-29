"use client";

import { ColumnDef } from "@tanstack/react-table";
import { RankingItemEntity } from "@/shared/entities";

const getMedal = (position: number) => {
  switch (position) {
    case 1: return <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center border border-black font-black text-xs">01</div>;
    case 2: return <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border border-black font-black text-xs">02</div>;
    case 3: return <div className="w-8 h-8 rounded-full bg-orange-200 flex items-center justify-center border border-black font-black text-xs">03</div>;
    default: return null;
  }
};

const formatTicketCode = (code: string): string => {
  // Remove any non-numeric characters and pad to 6 digits
  const numericCode = code.replace(/\D/g, '').padStart(6, '0');
  // Format as "000 000"
  return `${numericCode.slice(0, 3)} ${numericCode.slice(3, 6)}`;
};

export const columns: ColumnDef<RankingItemEntity>[] = [
  {
    accessorKey: "position",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">POS</span>,
    cell: ({ row }) => {
      const position = row.original.position;
      return (
        <div className="flex justify-center">
          {getMedal(position) || (
            <span className="text-gray-400 text-sm font-black italic">{position.toString().padStart(2, '0')}</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: () => <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">PARTICIPANTE</span>,
    cell: ({ row }) => {
      const bettor = row.original;
      return (
        <span className={`text-sm font-black uppercase italic tracking-tighter ${bettor.position <= 3 ? "text-gray-900 underline decoration-yellow-400 decoration-2 underline-offset-4" : "text-gray-700"}`}>
          {bettor.name}
        </span>
      );
    },
  },
  {
    accessorKey: "ticketCode",
    header: () => <div className="text-center text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500">CÓDIGO</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-black bg-gray-100 px-3 py-1 rounded-none border border-black">
            {formatTicketCode(row.original.ticketCode)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "exactScores",
    header: () => <div className="text-center text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500">EXATOS</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <span className="text-sm font-black text-yellow-600">{row.original.exactScores}</span>
      </div>
    ),
  },
  {
    accessorKey: "winnerScores",
    header: () => <div className="text-center text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500">VENCEDOR</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <span className="text-sm font-black text-gray-400">{row.original.winnerScores}</span>
      </div>
    ),
  },
  {
    accessorKey: "wrongScores",
    header: () => <div className="text-center text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500">ERROS</div>,
    cell: ({ row }) => (
      <div className="text-center">
        <span className="text-sm font-black text-red-500">{row.original.wrongScores}</span>
      </div>
    ),
  },
  {
    accessorKey: "points",
    header: () => <div className="text-right text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500">PONTOS</div>,
    cell: ({ row }) => {
      const bettor = row.original;
      return (
        <div className="text-right">
          <span className={`font-black text-sm sm:text-lg italic whitespace-nowrap ${bettor.position === 1
            ? "text-yellow-500"
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
