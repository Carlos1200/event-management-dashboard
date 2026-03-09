import type { EventDto } from "./events.types";

export async function listEvents(): Promise<EventDto[]> {
  const response = await fetch("/api/events");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return (await response.json()) as EventDto[];
}