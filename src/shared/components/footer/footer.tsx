import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900">
              Bolão<span className="text-green-600">JC</span>
            </h3>
            <p className="text-sm text-gray-500 mt-1">O bolão dos amigos</p>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/regulamento" className="hover:text-green-600 transition-colors">Regulamento</Link>
            <Link href="/ranking" className="hover:text-green-600 transition-colors">Ranking</Link>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">WhatsApp</a>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">© 2026 BolãoJC</p>
        </div>
      </div>
    </footer>
  );
};
