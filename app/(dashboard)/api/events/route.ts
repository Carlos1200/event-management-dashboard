import { NextResponse } from "next/server";
import type { EventDto } from "@/features/events/events.types";

const REQUEST_TIMEOUT_MS = 8000;

export async function GET() {
  const baseUrl = process.env.MOCKAPI_BASE_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { message: "Missing MOCKAPI_BASE_URL environment variable" },
      { status: 500 },
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

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