import { KpiItem } from "../hooks";

interface KpiCardProps {
  kpi: KpiItem;
}

export function KpiCard({ kpi }: KpiCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{kpi.icon}</span>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</p>
          <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
        </div>
      </div>
    </div>
  );
}
