"use client";

import { useQuery } from "@tanstack/react-query";
import { calendarService } from "./calendar.service";
import { TickerBanner } from "@/shared/components/ticker-banner";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { Calendar, Trophy, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CalendarPage() {
  const { data: rounds, isLoading } = useQuery({
    queryKey: ["calendar"],
    queryFn: calendarService.getCalendar,
  });

  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 hover:bg-white rounded-full transition-colors border border-transparent hover:border-gray-200"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <div>
              <h1 className="text-4xl font-black uppercase italic tracking-tight text-gray-900 leading-none flex items-center gap-3">
                <Calendar className="w-10 h-10 text-yellow-500" />
                Calendário <span className="text-yellow-400">Brasileirão 2026</span>
              </h1>
              <p className="text-gray-500 font-medium ml-1">Acompanhe todas as 38 rodadas da temporada</p>
            </div>
          </div>

          <div className="hidden md:flex bg-yellow-50 px-4 py-2 rounded-lg border border-yellow-200 items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600" />
            <span className="text-yellow-800 font-bold uppercase text-sm tracking-wider">Cobertura Oficial</span>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full rounded-xl border border-dashed border-gray-200" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rounds?.map((round, index) => (
              <Card
                key={round}
                className="group relative overflow-hidden border border-transparent hover:border-yellow-400 transition-all duration-300 shadow-sm hover:shadow-xl bg-white"
              >
                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-20 transition-opacity">
                  <span className="text-6xl font-black italic">{index + 1}</span>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-yellow-600">Rodada {index + 1}</span>
                  </div>
                  <CardTitle className="text-lg font-black uppercase italic text-gray-800 line-clamp-1">
                    {round.replace("Regular Season - ", "Rodada ")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-1 w-12 bg-gray-200 group-hover:bg-yellow-400 transition-colors mb-4" />
                  <p className="text-sm text-gray-500 font-medium">Jogos integrados em tempo real</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}
