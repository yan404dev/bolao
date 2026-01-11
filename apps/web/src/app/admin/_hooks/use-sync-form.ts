import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { syncChampionshipSchema, SyncChampionshipForm } from "../admin.schema";
import { useAdmin } from "./use-admin";

export function useSyncForm() {
  const { sync, isSyncing, leagues, isLoadingLeagues, country, setCountry } = useAdmin();

  const form = useForm<SyncChampionshipForm>({
    resolver: zodResolver(syncChampionshipSchema),
    defaultValues: {
      leagueId: 423,
      season: 2026,
    }
  });

  const onSubmit = (data: SyncChampionshipForm) => {
    sync({ leagueId: Number(data.leagueId), season: Number(data.season) });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSyncing,
    leagues,
    isLoadingLeagues,
    country,
    setCountry
  };
}
