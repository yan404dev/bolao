"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/button";
import { ChevronDown } from "lucide-react";

export const Hero = () => {
  const playerImages = [
    "https://images.unsplash.com/photo-1579952363873-27f3bade9f55",
    "https://images.unsplash.com/photo-1560272564-c83b66b1ad12",
    "https://images.unsplash.com/photo-1522778119026-d647f0596c20",
    "https://images.unsplash.com/photo-1517466787929-bc90951d0974",
    "https://images.unsplash.com/photo-1551958219-acbc608c6377",
    "https://images.unsplash.com/photo-1546519638-68e109498ffc",
    "https://images.unsplash.com/photo-1552667466-07770ae110d0",
    "https://images.unsplash.com/photo-1518604666860-9ed391f76460",
    "https://images.unsplash.com/photo-1459865264687-595d652de67e",
    "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c",
    "https://images.unsplash.com/photo-1574629810360-7efbbe195018",
    "https://images.unsplash.com/photo-1508098682722-e99c643e7f0b",
    "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d",
    "https://images.unsplash.com/photo-1606925797300-0b35e9d1794e",
    "https://images.unsplash.com/photo-1553778263-73a83bab9b0c",
    "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9",
    "https://images.unsplash.com/photo-1471295253337-3ceaaedca402",
    "https://images.unsplash.com/photo-1518091043644-c1d4457512c6",
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Grid de imagens de fundo */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-0.5 h-[50vh] overflow-hidden">
        {playerImages.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.05 }}
            className="relative overflow-hidden h-full"
          >
            <Image
              src={`${img}?w=400&h=600&fit=crop&auto=format&q=80`}
              alt={`Futebol ${index + 1}`}
              className="w-full h-full object-cover"
              width={400}
              height={600}
              priority={index < 6}
              sizes="(max-width: 768px) 33vw, 16vw"
            />
          </motion.div>
        ))}
      </div>

      {/* Overlay com conteúdo */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-black/40 via-black/60 to-black/80">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center max-w-3xl mx-auto px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Palpite agora e{" "}
            <span className="text-green-400">ganhe prêmios</span> em dinheiro!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-gray-200 mb-8"
          >
            Sem cadastro. Sem complicação. Escolha seus palpites e pague via PIX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <Link href="#rodadas">
              <Button
                size="lg"
                className="h-14 px-10 text-lg bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full shadow-lg shadow-green-600/30 hover:shadow-green-600/50 transition-all"
              >
                Ver Rodadas Abertas
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
