"use client";

import { useQuery } from "@tanstack/react-query";
import { listEvents } from "./events.api";
import { eventsKeys } from "./events.keys";

export function useEventsQuery() {
  return useQuery({
    queryKey: eventsKeys.list(),
    queryFn: listEvents,
    staleTime: 60_000,
  });
}