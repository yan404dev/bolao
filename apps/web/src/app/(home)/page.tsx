import Image from "next/image";
import { TickerBanner } from "@/shared/components/ticker-banner";
import { UserActions } from "./_components/user-actions";
import { ClosedRounds } from "./_components/closed-rounds";
import { Footer } from "@/shared/components/footer";

export default function Home() {
  return (
    <main>
      <TickerBanner ticketsSold={127} prizePool="R$ 1,250.00" />
      <Image src="/hero.png" alt="Hero" width={1920} height={1080} className="w-full" />
      <UserActions />
      <ClosedRounds />
      <Footer />
    </main>
  );
}
