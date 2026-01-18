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
    <main className="min-h-screen bg-white pb-12 text-black">
      <TickerBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
        <PageHeader
          title="Calendário"
          highlightedTitle="2026"
          subtitle="Explore o cronograma de desafios táticos"
        />

        <CalendarContent />
      </div>
    </main>
  );
}
