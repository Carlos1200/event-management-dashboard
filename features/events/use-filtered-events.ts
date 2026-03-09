"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  applyEventFilters,
  getEventFiltersFromSearchParams,
  hasAnyEventFilters,
} from "./event-filters";
import type { EventDto } from "./events.types";

export function useFilteredEvents(events: EventDto[]) {
  const searchParams = useSearchParams();

  const filters = useMemo(
    () => getEventFiltersFromSearchParams(searchParams),
    [searchParams],
  );

  const filteredEvents = useMemo(
    () => applyEventFilters(events, filters),
    [events, filters],
  );

  return {
    filters,
    filteredEvents,
    hasFilters: hasAnyEventFilters(filters),
  };
}
