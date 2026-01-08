"use client";

export interface Bettor {
  position: number;
  name: string;
  ticketCode: string;
  points: number;
  exactScores: number;
  winnerScores: number;
}

interface RankingTableRowProps {
  bettor: Bettor;
}

export function RankingTableRow({ bettor }: RankingTableRowProps) {
  const getMedal = (position: number) => {
    switch (position) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return null;
    }
  };

  return (
    <tr
      key={bettor.ticketCode}
      className={`hover:bg-gray-50 transition-colors ${bettor.position <= 3 ? "bg-amber-50/50" : ""}`}
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="text-lg">
          {getMedal(bettor.position) || (
            <span className="text-gray-400 text-sm font-medium">{bettor.position}</span>
          )}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`font-medium ${bettor.position <= 3 ? "text-gray-900" : "text-gray-700"}`}>
          {bettor.name}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          #{bettor.ticketCode}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-green-600 font-medium">{bettor.exactScores}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-center">
        <span className="text-gray-600">{bettor.winnerScores}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right">
        <span className={`font-bold ${bettor.position === 1 ? "text-amber-600 text-lg" : bettor.position <= 3 ? "text-gray-900" : "text-gray-700"
          }`}>
          {bettor.points}
        </span>
      </td>
    </tr>
  );
}
