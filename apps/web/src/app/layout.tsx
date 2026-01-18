import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Toaster } from "sonner";
import { QueryProvider } from "@/shared/providers/query-provider";
import { BettingModalProvider } from "@/shared/providers/betting-modal-provider";
import { Footer } from "@/shared/components/footer/footer";
import { GlobalBettingModal } from "@/shared/components/global-betting-modal";
import { MobileNav } from "@/shared/components/mobile-nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://arenadeelite.com.br"),
  title: {
    default: "Arena de Elite | Inteligência Tática e Análise Profissional de Futebol",
    template: "%s | Arena de Elite"
  },
  description: "A plataforma definitiva para especialistas em tática de futebol. Demonstre sua leitura de jogo, domine o ranking e conquiste reconhecimento através da sua precisão analítica nas partidas.",
  keywords: ["futebol", "análise tática", "prognósticos esportivos", "estratégia de jogo", "inteligência futebolística", "classificação de especialistas"],
  authors: [{ name: "Elite Insights" }],
  creator: "Elite Insights",
  publisher: "Arena Digital",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Arena de Elite | Domine a Estratégia no Futebol",
    description: "Acesse o hub dos maiores analistas táticos do país. Transforme seu conhecimento do campo em resultados e lidere a competição.",
    url: "https://arenadeelite.com.br",
    siteName: "Arena de Elite",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Arena de Elite - Mestre da Tática no Futebol",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NuqsAdapter>
          <QueryProvider>
            <BettingModalProvider>
              <Toaster richColors position="top-right" />
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                  __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    "name": "Arena de Elite",
                    "url": "https://arenadeelite.com.br",
                    "logo": "https://arenadeelite.com.br/logo.png",
                    "description": "A plataforma definitiva para especialistas em tática de futebol.",
                    "sameAs": [
                      "https://www.facebook.com/arenadeelite",
                      "https://www.instagram.com/arenadeelite"
                    ]
                  }),
                }}
              />
              <main className="flex-1 pb-20 md:pb-0">
                {children}
              </main>
              <Footer />
              <MobileNav />
              <GlobalBettingModal />
            </BettingModalProvider>
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
