import type { EventDto } from "./events.types";

export type EventFilters = {
  query: string;
  status: string;
  mode: string;
  dateFrom: string;
  dateTo: string;
};

export function getEventFiltersFromSearchParams(searchParams: {
  get: (key: string) => string | null;
}): EventFilters {
  return {
    query: (searchParams.get("q") ?? "").trim().toLowerCase(),
    status: searchParams.get("status") ?? "",
    mode: searchParams.get("mode") ?? "",
    dateFrom: searchParams.get("from") ?? "",
    dateTo: searchParams.get("to") ?? "",
  };
}

export function hasAdvancedEventFilters(filters: EventFilters): boolean {
  return Boolean(filters.status || filters.mode || filters.dateFrom || filters.dateTo);
}

export function hasAnyEventFilters(filters: EventFilters): boolean {
  return Boolean(
    filters.query ||
      filters.status ||
      filters.mode ||
      filters.dateFrom ||
      filters.dateTo,
  );
}

export function applyEventFilters(events: EventDto[], filters: EventFilters): EventDto[] {
  return events.filter((event) => {
    const matchesSearch =
      !filters.query ||
      event.title.toLowerCase().includes(filters.query) ||
      event.eventCode.toLowerCase().includes(filters.query) ||
      event.description.toLowerCase().includes(filters.query) ||
      event.locationText.toLowerCase().includes(filters.query);

    const matchesStatus = !filters.status || event.status === filters.status;

    const matchesMode =
      !filters.mode ||
      (filters.mode === "virtual" && event.isVirtual) ||
      (filters.mode === "onsite" && !event.isVirtual);

    const eventDate = new Date(event.startAt);
    const fromDate = filters.dateFrom
      ? new Date(`${filters.dateFrom}T00:00:00`)
      : null;
    const toDate = filters.dateTo ? new Date(`${filters.dateTo}T23:59:59`) : null;

    const matchesDateFrom = !fromDate || eventDate >= fromDate;
    const matchesDateTo = !toDate || eventDate <= toDate;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesMode &&
      matchesDateFrom &&
      matchesDateTo
    );
  });
}
