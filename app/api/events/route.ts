import { NextResponse } from "next/server";
import type { CreateEventInput, EventDto } from "@/features/events/events.types";

const REQUEST_TIMEOUT_MS = 8000;

function createTimeoutController() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  return { controller, timeoutId };
}

function toUpstreamPayload(input: CreateEventInput) {
  return {
    title: input.title.trim(),
    status: input.status,
    startAt: new Date(input.startAt).toISOString(),
    locationText: input.locationText.trim(),
    isVirtual: input.isVirtual,
    eventCode: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
  };
}

export async function GET() {
  const baseUrl = process.env.MOCKAPI_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "Missing MOCKAPI_BASE_URL environment variable" },
      { status: 500 },
    );
  }

  const { controller, timeoutId } = createTimeoutController();

  try {
    const response = await fetch(`${baseUrl}/events`, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to fetch events from provider" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as EventDto[];
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { message: "Upstream request timed out" },
        { status: 504 },
      );
    }

    return NextResponse.json(
      { message: "Failed to fetch events from provider" },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function POST(request: Request) {
  const baseUrl = process.env.MOCKAPI_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "Missing MOCKAPI_BASE_URL environment variable" },
      { status: 500 },
    );
  }

  let input: CreateEventInput;
  try {
    input = (await request.json()) as CreateEventInput;
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }
  console.log(input);
  
  if (!input?.title || (!input?.isVirtual && !input?.locationText) || !input?.startAt || !input?.status) {
    return NextResponse.json(
      { message: "Missing required event fields" },
      { status: 400 },
    );
  }

  if (Number.isNaN(new Date(input.startAt).getTime())) {
    return NextResponse.json({ message: "Invalid event date" }, { status: 400 });
  }

  const { controller, timeoutId } = createTimeoutController();

  try {
    const response = await fetch(`${baseUrl}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toUpstreamPayload(input)),
      signal: controller.signal,
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Failed to create event in provider" },
        { status: 502 },
      );
    }

    const data = (await response.json()) as EventDto;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { message: "Upstream request timed out" },
        { status: 504 },
      );
    }

    return NextResponse.json(
      { message: "Failed to create event in provider" },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeoutId);
  }
}
