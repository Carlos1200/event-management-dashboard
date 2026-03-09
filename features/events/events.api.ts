import type { CreateEventInput, EventDto } from "./events.types";

export async function listEvents(): Promise<EventDto[]> {
  const response = await fetch("/api/events");

  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }

  return (await response.json()) as EventDto[];
}

export async function createEvent(input: CreateEventInput): Promise<EventDto> {
  const response = await fetch("/api/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new Error(payload?.message ?? "Failed to create event");
  }

  return (await response.json()) as EventDto;
}