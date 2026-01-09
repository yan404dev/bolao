import { Card, CardContent } from "@/shared/components/ui/card";
import { KpiItem } from "../hooks";

interface KpiCardProps {
  kpi: KpiItem;
}

export function KpiCard({ kpi }: KpiCardProps) {
  return (
    <Card className="brutalist-card border-l-4 border-l-yellow-400">
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-yellow-50 transition-colors">
            <span className="text-2xl">{kpi.icon}</span>
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">
              {kpi.label}
            </p>
            <p className="text-xl font-black text-gray-900 tracking-tighter uppercase italic">{kpi.value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
