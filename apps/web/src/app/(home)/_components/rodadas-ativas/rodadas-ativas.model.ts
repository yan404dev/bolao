import { ActionCard } from "./rodadas-ativas.types";

export function useRodadasAtivasModel() {
  const actions: ActionCard[] = [
    {
      id: 1,
      title: "Apostar",
      subtitle: "Faça seus palpites",
      href: "/apostar",
      animation: "soccer",
      bgColor: "bg-gradient-to-br from-green-500 to-green-700",
    },
    {
      id: 2,
      title: "Ranking",
      subtitle: "Classificação",
      href: "/ranking",
      animation: "trophy",
      bgColor: "bg-gradient-to-br from-amber-500 to-orange-600",
    },
    {
      id: 3,
      title: "Comunidade",
      subtitle: "Grupo no WhatsApp",
      href: "https://chat.whatsapp.com",
      animation: "money",
      bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
    },
    {
      id: 4,
      title: "Regulamento",
      subtitle: "Regras do bolão",
      href: "/regulamento",
      animation: "trophy",
      bgColor: "bg-gradient-to-br from-blue-500 to-indigo-600",
    },
  ];

  return { actions };
}
