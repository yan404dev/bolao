import Image from "next/image";
import { TickerBanner } from "@/shared/components/ticker-banner";
import { UserActions } from "./_components/user-actions";
import { ClosedRounds } from "./_components/closed-rounds";
import { ActiveRoundCTA } from "./_components/active-round-cta";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <TickerBanner />
      <Image src="/hero.png" alt="Hero" width={1920} height={1080} className="w-full" />
      <ActiveRoundCTA />
      <UserActions />
      <ClosedRounds />
    </main>
  );
}
