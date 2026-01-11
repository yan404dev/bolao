import { LayoutDashboard, Database, ShieldCheck } from "lucide-react";
import { useAdminQueries } from "./use-admin-queries";

export function useAdmin() {
  const adminQueries = useAdminQueries();
  const { rounds } = adminQueries;

  const stats = [
    {
      label: "Rodadas Ativas",
      value: rounds.filter(r => r.status === "OPEN").length,
      icon: LayoutDashboard,
    },
    {
      label: "Em Andamento",
      value: rounds.filter(r => r.status === "LIVE").length,
      icon: Database,
    },
    {
      label: "Aguardando Cálculo",
      value: rounds.filter(r => r.status === "CLOSED").length,
      icon: ShieldCheck,
    },
  ];

  return {
    ...adminQueries,
    stats,
    country: adminQueries.country,
    setCountry: adminQueries.setCountry
  };
}
