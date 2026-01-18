"use client";

import { SyncChampionshipForm } from "../sync-championship-form";
import { RoundManagementTable } from "../round-management-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ShieldCheck, Calendar as CalendarIcon, ExternalLink } from "lucide-react";
import { useAdmin } from "../../_hooks/use-admin";
import Link from "next/link";
import { PageHeader } from "@/shared/components/page-header";

export function AdminDashboard() {
  const { stats } = useAdmin();

  return (
    <div className="w-full space-y-12 p-4 sm:p-8 pt-8 sm:pt-12 text-black pb-32 bg-white">
      <PageHeader
        title="Painel de"
        highlightedTitle="Controle"
        subtitle="Gerenciamento Global do Sistema"
        badge={
          <div className="flex flex-wrap gap-3">
            <Link href="/calendario" className="brutalist-card px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-2 hover:bg-black hover:text-white group">
              <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span className="font-black uppercase italic text-[10px] sm:text-sm">Calendário</span>
            </Link>
            <Link href="/" className="brutalist-card px-4 py-2 sm:px-6 sm:py-3 flex items-center gap-2 hover:bg-black hover:text-white group">
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
              <span className="font-black uppercase italic text-[10px] sm:text-sm">Ver Site</span>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="brutalist-card border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="brutalist-subtitle mb-2">{stat.label}</p>
                <p className="text-4xl font-black italic tracking-tighter">{stat.value}</p>
              </div>
              <div className="p-3 bg-yellow-400 border-2 border-black">
                <stat.icon className="h-6 w-6 text-black" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <SyncChampionshipForm />

          <div className="p-6 brutalist-card border-2 bg-gray-50">
            <h3 className="text-black font-black uppercase italic tracking-tighter text-lg mb-4 flex items-center">
              <ShieldCheck className="mr-2 h-5 w-5 text-yellow-500" />
              Guia Administrativo
            </h3>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-gray-600 leading-relaxed">
              <li className="flex gap-2">
                <span className="text-yellow-500">▶</span>
                <span>Use o Sync para atualizar rodadas e placares.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500">▶</span>
                <span>Rodadas encerradas exigem cálculo de pontuação.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-yellow-500">▶</span>
                <span>Placares ao vivo são sincronizados automaticamente.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="lg:col-span-2">
          <RoundManagementTable />
        </div>
      </div>
    </div>
  );
}
