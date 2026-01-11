"use client";

import { useSyncForm } from "../_hooks/use-sync-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { RefreshCcw, Trophy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";

export function SyncChampionshipForm() {
  const { form, onSubmit, isSyncing, leagues, isLoadingLeagues, country, setCountry } = useSyncForm();

  const { register, formState: { errors }, setValue, watch } = form;
  const currentLeagueId = watch("leagueId");

  return (
    <Card className="brutalist-card border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <CardHeader className="border-b-2 border-black bg-gray-50">
        <CardTitle className="brutalist-section-header flex items-center">
          <RefreshCcw className={`mr-2 h-5 w-5 text-yellow-500 ${isSyncing ? "animate-spin" : ""}`} />
          Sincronizar Dados
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label className="brutalist-subtitle">País (Filtro)</Label>
              <Input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="EX: BRAZIL, ENGLAND, SPAIN..."
                className="brutalist-input h-10 text-xs"
              />
            </div>

            <div className="space-y-2">
              <Label className="brutalist-subtitle">Campeonato</Label>
              <Select
                disabled={isLoadingLeagues || isSyncing}
                onValueChange={(val) => setValue("leagueId", Number(val) as any)}
                value={currentLeagueId?.toString()}
              >
                <SelectTrigger className="brutalist-input h-12 text-xs">
                  <SelectValue placeholder={isLoadingLeagues ? "CARREGANDO..." : "ESCOLHA UM CAMPEONATO"} />
                </SelectTrigger>
                <SelectContent className="bg-white border-2 border-black rounded-none">
                  {leagues.map((league: any) => (
                    <SelectItem key={league.id} value={league.id.toString()} className="font-bold uppercase italic text-xs focus:bg-yellow-400 focus:text-black">
                      <div className="flex items-center gap-2">
                        {league.logo && <img src={league.logo} alt="" className="h-4 w-4 object-contain" />}
                        <span>{league.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input type="hidden" {...register("leagueId")} />
              {errors.leagueId && <p className="text-[10px] font-black text-red-600 uppercase mt-1">{errors.leagueId.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="season" className="brutalist-subtitle">Temporada</Label>
              <Input
                id="season"
                {...register("season")}
                placeholder="EX: 2026"
                className="brutalist-input h-12 text-center text-lg"
              />
              {errors.season && <p className="text-[10px] font-black text-red-600 uppercase mt-1">{errors.season.message}</p>}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isSyncing}
              className="brutalist-btn-primary flex-1 h-14 text-sm"
            >
              {isSyncing ? (
                <>
                  <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
                  PROCESSANDO...
                </>
              ) : (
                <>
                  <Trophy className="mr-2 h-4 w-4" />
                  SINCRONIZAR
                </>
              )}
            </Button>
          </div>
          <p className="text-[8px] text-center text-gray-400 uppercase tracking-[0.2em] font-black">
            Os dados existentes serão preservados
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
