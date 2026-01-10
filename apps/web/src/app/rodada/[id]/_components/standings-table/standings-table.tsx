"use client";

import { useStandings } from "./hooks";
import { getPositionStyle } from "@/shared/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/shared/components/ui/avatar";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function StandingsTable() {
  const { data: standings, isLoading } = useStandings();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full border-2 border-black rounded-none" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white border-4 border-black rounded-none overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
      <div className="bg-black text-white p-4 font-black uppercase italic text-lg tracking-tighter flex items-center justify-between">
        <span className="flex items-center gap-2">
          <div className="w-3 h-6 bg-yellow-400 -skew-x-12" />
          Tabela Brasileirão 2026
        </span>
        <span className="text-yellow-400 bg-white/10 px-2 py-0.5 rounded-sm text-xs">Série A</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 brutalist-border-b font-black uppercase italic text-xs tracking-widest">
              <th className="p-4 border-r-2 border-black">#</th>
              <th className="p-4 border-r-2 border-black">Clube</th>
              <th className="p-4 text-center border-r-2 border-black bg-yellow-400/10">P</th>
              <th className="p-4 text-center border-r-2 border-black">J</th>
              <th className="p-4 text-center border-r-2 border-black">V</th>
              <th className="p-4 text-center hidden sm:table-cell">SG</th>
            </tr>
          </thead>
          <tbody>
            {standings?.map((team) => (
              <tr key={team.teamName} className="brutalist-border-b hover:bg-yellow-50 transition-colors group font-bold">
                <td className="p-4 border-r-2 border-black text-center">
                  <div className={`brutalist-position-badge ${getPositionStyle(team.position)}`}>
                    {team.position}
                  </div>
                </td>
                <td className="p-4 border-r-2 border-black">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 border-2 border-black p-1 bg-white relative group-hover:-rotate-3 transition-transform">
                      <Avatar className="w-full h-full rounded-none">
                        <AvatarImage src={team.teamLogo} alt={team.teamName} />
                        <AvatarFallback className="bg-gray-200 text-xs font-black">{team.teamName.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <span className="font-black uppercase italic tracking-tighter truncate max-w-[140px] leading-tight">{team.teamName}</span>
                  </div>
                </td>
                <td className="p-4 text-center font-black text-xl border-r-2 border-black bg-yellow-400/5 text-black">{team.points}</td>
                <td className="p-4 text-center font-black text-gray-400 border-r-2 border-black">{team.played}</td>
                <td className="p-4 text-center font-black text-gray-400 border-r-2 border-black">{team.won}</td>
                <td className="p-4 text-center font-black text-gray-400 hidden sm:table-cell">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-gray-100 border-t-4 border-black flex flex-wrap gap-4 text-[10px] font-black uppercase italic">
        <div className="flex items-center gap-2"><div className="brutalist-legend-item bg-blue-600" /> Libertadores</div>
        <div className="flex items-center gap-2"><div className="brutalist-legend-item bg-blue-300" /> Pré-Liberta</div>
        <div className="flex items-center gap-2"><div className="brutalist-legend-item bg-red-600" /> Rebaixamento</div>
      </div>
    </div>
  );
}
