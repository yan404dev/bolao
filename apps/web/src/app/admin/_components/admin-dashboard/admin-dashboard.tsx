"use client";

import { SyncChampionshipForm } from "../sync-championship-form";
import { RoundManagementTable } from "../round-management-table";
import { Card, CardContent } from "@/shared/components/ui/card";
import { ShieldCheck, Calendar as CalendarIcon, ExternalLink } from "lucide-react";
import { useAdmin } from "../../_hooks/use-admin";
import Link from "next/link";

export function AdminDashboard() {
  const { stats } = useAdmin();

  return (
    <div className="w-full space-y-12 p-6 pt-12 text-black pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-l-8 border-yellow-400 pl-6 py-2">
        <div>
          <h1 className="brutalist-title text-5xl">
            Painel de <span className="text-yellow-500 underline decoration-black underline-offset-8">Controle</span>
          </h1>
          <p className="brutalist-subtitle mt-2">
            Gerenciamento Global do Sistema
          </p>
        </div>

        <div className="flex gap-4">
          <Link href="/calendario" className="brutalist-card px-6 py-3 flex items-center gap-2 hover:bg-black hover:text-white group">
            <CalendarIcon className="w-5 h-5 text-yellow-500" />
            <span className="font-black uppercase italic text-sm">Calendário</span>
          </Link>
          <Link href="/" className="brutalist-card px-6 py-3 flex items-center gap-2 hover:bg-black hover:text-white group">
            <ExternalLink className="w-5 h-5 text-yellow-500" />
            <span className="font-black uppercase italic text-sm">Ver Site</span>
          </Link>
        </div>
      </div>

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
