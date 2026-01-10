"use client";

import { TickerBanner, BackButton } from "@/shared/components";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Calendar, Trophy } from "lucide-react";
import { RoundCard } from "./_components";
import { useCalendar } from "./_hooks/use-calendar";

export default function CalendarPage() {
  const { data: rounds, isLoading } = useCalendar();

  return (
    <main className="min-h-screen bg-gray-50 pb-12 text-black">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div className="mt-1 sm:mt-0">
              <BackButton />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight text-black leading-tight sm:leading-none flex flex-wrap items-center gap-2 sm:gap-3">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-500 shrink-0" />
                <span className="truncate sm:whitespace-normal">Calendário</span>
                <span className="text-yellow-400 whitespace-nowrap sm:whitespace-normal">Brasileirão 2026</span>
              </h1>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs mt-1 sm:mt-2 ml-0 sm:ml-1 line-clamp-1 sm:line-clamp-none">
                38 rodadas da temporada
              </p>
            </div>
          </div>

          <div className="hidden md:flex bg-yellow-400 border-2 border-black px-4 py-2 rounded-none items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Trophy className="w-5 h-5 text-black" />
            <span className="text-black font-black uppercase text-sm tracking-wider italic">Cobertura Oficial</span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-none border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {rounds?.map((round, index) => (
              <RoundCard key={round.id} round={round} index={index} />
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
