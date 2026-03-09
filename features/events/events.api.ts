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

export async function getEventById(id: string): Promise<EventDto> {
  const response = await fetch(`/api/events/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }

  return (await response.json()) as EventDto;
}

export async function updateEvent(
  id: string,
  input: CreateEventInput,
): Promise<EventDto> {
  const response = await fetch(`/api/events/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new Error(payload?.message ?? "Failed to update event");
  }

  return (await response.json()) as EventDto;
}

export async function deleteEvent(id: string): Promise<void> {
  const response = await fetch(`/api/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as
      | { message?: string }
      | null;
    throw new Error(payload?.message ?? "Failed to delete event");
  }
}