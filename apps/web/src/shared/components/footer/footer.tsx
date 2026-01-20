import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#000] py-12 border-t-2 border-yellow-400">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">
              ARENA<span className="text-yellow-400"> DE ELITE</span>
            </h3>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-2">
              Onde especialistas se destacam • 2026
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 text-sm font-black uppercase italic">
            <Link href="/regulamento" className="text-white hover:text-yellow-400 transition-all hover:scale-105">
              Regulamento
            </Link>
            <Link href="/ranking" className="text-white hover:text-yellow-400 transition-all hover:scale-105">
              Ranking
            </Link>
            <a
              href="https://chat.whatsapp.com/K6Ni8HK72Bw2us79Erk0t6"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-yellow-400 text-black border border-black font-black uppercase italic text-xs tracking-widest hover:bg-white transition-all rounded-none"
            >
              Comunidade
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
            © 2026 ARENA DE ELITE • ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
};
