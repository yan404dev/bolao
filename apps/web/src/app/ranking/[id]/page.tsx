import { RankingTable, RankingKpis } from "../_components";
import { TickerBanner } from "@/shared/components/ticker-banner";
import { Footer } from "@/shared/components/footer";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

interface RankingRoundPageProps {
  params: Promise<{ id: string }>;
}

export default async function RankingRoundPage({ params }: RankingRoundPageProps) {
  const { id } = await params;
  const roundId = parseInt(id);

  return (
    <main className="min-h-screen bg-gray-50">
      <TickerBanner />

      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Ranking</h1>
          <p className="text-gray-500 mt-1">Follow the round #{id} standings</p>
        </div>

        <RankingKpis roundId={roundId} />
        <RankingTable roundId={roundId} />
      </div>

      <Footer />
    </main>
  );
}
