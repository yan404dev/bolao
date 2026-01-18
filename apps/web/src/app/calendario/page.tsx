import { TickerBanner } from "@/shared/components/ticker-banner/ticker-banner";
import { PageHeader } from "@/shared/components/page-header";
import { CalendarContent } from "./_components/calendar-content";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agenda de Jogos | Cronograma de Desafios Táticos",
  description: "Fique por dentro de todos os confrontos da elite. Analise o calendário e planeje suas próximas jogadas.",
};

export default function CalendarioPage() {
  return (
    <main className="min-h-screen bg-white">
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
