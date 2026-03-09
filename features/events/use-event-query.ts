"use client";

import { useQuery } from "@tanstack/react-query";
import { getEventById } from "./events.api";
import { eventsKeys } from "./events.keys";

export function useEventQuery(eventId: string) {
  return useQuery({
    queryKey: eventsKeys.detail(eventId),
    queryFn: () => getEventById(eventId),
    enabled: Boolean(eventId),
  });
}
