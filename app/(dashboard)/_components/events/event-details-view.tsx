"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    AlertCircle,
    ArrowLeft,
    CalendarDays,
    Copy,
    MapPin,
    Pencil,
} from "lucide-react";
import { useEventQuery } from "@/features/events/use-event-query";
import { EVENT_STATUS_META } from "./event-types";
import { FeedbackState } from "../ui/feedback-state";
import { RetryButton } from "../ui/retry-button";
import { EventDetailsSkeleton } from "./event-details-skeleton";

type EventDetailsViewProps = {
    eventId: string;
};

function formatDateLabel(iso: string) {
    const date = new Date(iso);
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
    }).format(date);
}

function formatTimeLabel(iso: string) {
    const date = new Date(iso);
    return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
}

export function EventDetailsView({ eventId }: EventDetailsViewProps) {
    const router = useRouter();
    const { data: event, isLoading, isError, refetch } = useEventQuery(eventId);

    if (isLoading) {
        return <EventDetailsSkeleton />;
    }

    if (isError || !event) {
        return (
            <FeedbackState
                tone="error"
                icon={<AlertCircle className="h-5 w-5 text-red-600" />}
                title="We couldn't load this event"
                description="Try again in a moment."
                action={<RetryButton onClick={() => refetch()} />}
            />
        );
    }

    const statusMeta = EVENT_STATUS_META[event.status];

    return (
        <div className="mx-auto w-full max-w-6xl space-y-5 p-3 sm:p-4 md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="button"
                    onClick={() => router.push("/")}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#64748b] transition hover:text-[#334155]"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to List
                </button>

                <div className="flex items-center gap-3">
                    <Link
                        href={`/events/new?duplicateFrom=${event.id}`}
                        className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#d7dee9] bg-white px-4 text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                    >
                        <Copy className="h-4 w-4" />
                        Duplicate
                    </Link>
                    <Link
                        href={`/events/${event.id}/edit`}
                        className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#13c8ec] px-4 text-sm font-semibold text-white transition hover:bg-[#10b7d8]"
                    >
                        <Pencil className="h-4 w-4" />
                        Edit Event
                    </Link>
                </div>
            </div>

            <article className="rounded-3xl border border-[#e5e7eb] bg-white p-5 sm:p-6">
                <div className="flex flex-wrap items-center gap-2">
                    <span
                        className={`inline-flex rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusMeta.badgeClassName}`}
                    >
                        {statusMeta.label}
                    </span>
                    {event.isVirtual ? (
                        <span className="inline-flex rounded-lg bg-[#ffedd5] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#ea580c]">
                            Virtual Event
                        </span>
                    ) : null}
                </div>

                <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
                    {event.title}
                </h2>

                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#edf2f7] pt-5 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfeff] text-[#13c8ec]">
                            <CalendarDays className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
                                Date & Time
                            </p>
                            <p className="mt-1 text-lg font-semibold text-[#1f2937]">
                                {formatDateLabel(event.startAt)}
                            </p>
                            <p className="text-sm text-[#64748b]">
                                {formatTimeLabel(event.startAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#ecfeff] text-[#13c8ec]">
                            <MapPin className="h-5 w-5" />
                        </span>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#94a3b8]">
                                Location
                            </p>
                            <p className="mt-1 text-lg font-semibold text-[#1f2937]">
                                {event.isVirtual
                                    ? "Online (Virtual Event)"
                                    : event.locationText}
                            </p>
                        </div>
                    </div>
                </div>
            </article>

            <section className="rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-7">
                <h3 className="text-2xl font-bold text-[#0f172a]">
                    About the Event
                </h3>
                <p className="mt-4 whitespace-pre-line text-base leading-8 text-[#475569]">
                    {event.description}
                </p>
            </section>
        </div>
    );
}
