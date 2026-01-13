"use client";

import { useAdmin } from "../_hooks/use-admin";
import { getStatusConfig } from "../admin.utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Button } from "@/shared/components/ui/button";
import { Trophy, Calendar, Globe } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function RoundManagementTable() {
  const { rounds, isLoadingRounds, calculate, isCalculating, updateStatus, isUpdatingStatus } = useAdmin();

  if (isLoadingRounds) {
    return (
      <Card className="brutalist-card border-2">
        <CardContent className="p-6">
          <Skeleton className="h-[400px] w-full bg-gray-100" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="brutalist-card border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
      <CardHeader className="bg-black border-b-2 border-black">
        <CardTitle className="text-white flex items-center justify-between brutalist-section-header">
          <div className="flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-yellow-400" />
            Rodadas
          </div>
          <span className="text-[10px] font-black text-yellow-400 uppercase tracking-widest">
            {rounds.length} Total
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 border-b-2 border-black">
              <TableRow className="hover:bg-transparent border-none">
                <TableHead className="text-black font-black uppercase text-[10px] tracking-widest italic">Info</TableHead>
                <TableHead className="text-black font-black uppercase text-[10px] tracking-widest italic text-center">Status</TableHead>
                <TableHead className="text-black font-black uppercase text-[10px] tracking-widest italic text-center">Início</TableHead>
                <TableHead className="text-black font-black uppercase text-[10px] tracking-widest italic text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rounds.map((round) => {
                const config = getStatusConfig(round.status);
                return (
                  <TableRow key={round.id} className="border-b border-gray-100 hover:bg-yellow-50/50 transition-colors">
                    <TableCell className="py-4">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-black uppercase italic tracking-tighter text-black">{round.title}</span>
                        <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest font-mono">
                          <Globe className="mr-1 h-3 w-3" />
                          {round.championshipTitle}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className={`brutalist-badge-sm ${config.color}`}>
                        {config.label}
                      </div>
                    </TableCell>
                    <TableCell className="text-center text-[10px] font-black text-gray-400 font-mono">
                      {new Date(round.startDate).toLocaleDateString("pt-BR")}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {round.status === "CLOSED" && (
                          <Button
                            size="sm"
                            onClick={() => updateStatus({ roundId: round.id, status: "OPEN" })}
                            disabled={isUpdatingStatus}
                            className="h-8 px-3 rounded-none border-2 border-green-600 bg-green-50 text-green-600 font-black uppercase italic text-[9px] hover:bg-green-600 hover:text-white transition-all"
                          >
                            Abrir Apostas
                          </Button>
                        )}
                        {round.status === "OPEN" && (
                          <Button
                            size="sm"
                            onClick={() => updateStatus({ roundId: round.id, status: "CLOSED" })}
                            disabled={isUpdatingStatus}
                            className="h-8 px-3 rounded-none border-2 border-red-600 bg-red-50 text-red-600 font-black uppercase italic text-[9px] hover:bg-red-600 hover:text-white transition-all"
                          >
                            Fechar Apostas
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={() => calculate(round.id)}
                          disabled={round.status === "OPEN" || round.status === "CALCULATED" || isCalculating}
                          className={`
                            h-8 px-4 rounded-none border-2 font-black uppercase italic text-[9px] transition-all
                            ${round.status === "CLOSED" ? "border-black bg-yellow-400 text-black hover:bg-black hover:text-white" : "border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed"}
                          `}
                        >
                          {round.status === "CALCULATED" ? "Calculado" : "Calcular Pontos"}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {rounds.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-20">
                    <div className="flex flex-col items-center gap-2 text-gray-300">
                      <Globe className="h-10 w-10" />
                      <p className="font-black uppercase italic tracking-widest text-xs">Vazio</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
