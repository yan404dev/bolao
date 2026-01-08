import { RodadaHeader, RodadaKpis, RodadaJogos, RodadaRanking } from "./_components";
import { TickerBanner } from "@/shared/components/ticker-banner";
import { Footer } from "@/shared/components/footer";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface RoundPageProps {
  params: Promise<{ id: string }>;
}

export default async function RoundPage({ params }: RoundPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gray-50">
      <TickerBanner ticketsSold={127} prizePool="R$ 1,270.00" />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors p-2 -ml-2">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <span className="font-semibold text-gray-900">Round #{id}</span>
          <div className="w-9" />
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        <RodadaHeader />
        <RodadaKpis />

        <div className="grid md:grid-cols-2 gap-6">
          <RodadaJogos />
          <RodadaRanking rodadaId={id} />
        </div>
      </div>

      <Footer />
    </main>
  );
}
