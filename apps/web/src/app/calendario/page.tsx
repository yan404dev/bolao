import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { BackButton } from "@/shared/components/back-button/back-button";
import { Calendar } from "lucide-react";
import { CalendarContent } from "./_components/calendar-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda de Jogos | Cronograma de Desafios Táticos",
  description: "Planeje suas análises para as próximas partidas. Fique por dentro de todos os confrontos programados e maximize sua performance em cada rodada.",
};

export default function CalendarPage() {
  return (
    <main className="min-h-screen bg-gray-50 pb-12 text-black">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <Calendar className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-yellow-500 shrink-0" />
          <h1 className="text-xl sm:text-3xl md:text-4xl font-black uppercase italic tracking-tight text-black">Calendário</h1>
        </div>

        <CalendarContent />
      </div>
    </main>
  );
}
