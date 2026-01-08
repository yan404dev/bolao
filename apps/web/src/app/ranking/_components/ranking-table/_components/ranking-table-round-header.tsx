"use client";

export interface RoundInfo {
  id: number;
  title: string;
  status: "open" | "closed";
  startTime: string;
}

interface RankingTableRoundHeaderProps {
  round: RoundInfo;
}

export function RankingTableRoundHeader({ round }: RankingTableRoundHeaderProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${round.status === "open" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"
              }`}>
              {round.status === "open" ? "🔴 Live" : "Closed"}
            </span>
          </div>
          <h2 className="text-xl font-bold text-gray-900">{round.title}</h2>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Round Start</p>
          <p className="text-sm font-medium text-gray-900">{round.startTime}</p>
        </div>
      </div>
    </div>
  );
}
