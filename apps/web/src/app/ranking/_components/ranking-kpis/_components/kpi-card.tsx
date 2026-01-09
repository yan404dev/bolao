import { Card, CardContent } from "@/shared/components/ui/card";
import { KpiItem } from "../hooks";

interface KpiCardProps {
  kpi: KpiItem;
}

export function KpiCard({ kpi }: KpiCardProps) {
  return (
    <Card className="bg-white">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{kpi.icon}</span>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              {kpi.label}
            </p>
            <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
