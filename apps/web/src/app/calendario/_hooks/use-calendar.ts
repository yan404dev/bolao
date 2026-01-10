"use client";

import { useQuery } from "@tanstack/react-query";
import { calendarService } from "../calendar.service";

export function useCalendar() {
  return useQuery({
    queryKey: ["calendar"],
    queryFn: calendarService.getCalendar,
  });
}
