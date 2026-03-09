"use client";

import { AlertCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { EventCard } from "./event-card";
import { useEventDeleteAction } from "@/features/events/use-event-delete-action";
import { useFilteredEvents } from "@/features/events/use-filtered-events";
import { useEventsQuery } from "@/features/events/use-events-query";
import { EventsSkeleton } from "./events-skeleton";
import { FeedbackState } from "../ui/feedback-state";
import { RetryButton } from "../ui/retry-button";

function formatDateLabel(iso: string) {
    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(iso));
}

export function EventsList() {
    const router = useRouter();
    const pathname = usePathname();
    const { requestDelete } = useEventDeleteAction();
    const { data: events = [], isLoading, isError, refetch } = useEventsQuery();
    const { filteredEvents, hasFilters } = useFilteredEvents(events);

    if (isLoading) return <EventsSkeleton />;

    if (isError) {
        return (
            <FeedbackState
                tone="error"
                icon={<AlertCircle className="h-5 w-5 text-red-600" />}
                title="We couldn't load events"
                description="Please check your connection and try again."
                action={<RetryButton onClick={() => refetch()} />}
            />
        );
    }

    if (!events.length) {
        return (
            <FeedbackState
                title="No events yet"
                description="Create your first event to get started."
            />
        );
    }

    if (!filteredEvents.length) {
        return (
            <FeedbackState
                title="No events match your filters"
                description="Try changing search terms or clearing filters."
                action={
                    hasFilters ? (
                        <button
                            type="button"
                            onClick={() =>
                                router.replace(pathname, { scroll: false })
                            }
                            className="rounded-lg border border-[#d7dee9] bg-white px-3 py-2 text-sm font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                        >
                            Clear filters
                        </button>
                    ) : undefined
                }
            />
        );
    }

    return (
        <div
            id="events-list"
            aria-live="polite"
            className="grid grid-cols-1 gap-4 p-3 sm:p-4 md:grid-cols-2 xl:grid-cols-3"
        >
            {filteredEvents.map((event) => (
                <EventCard
                    key={event.id}
                    eventCode={event.eventCode}
                    title={event.title}
                    dateLabel={formatDateLabel(event.startAt)}
                    locationText={event.locationText}
                    status={event.status}
                    isVirtual={event.isVirtual}
                    onEdit={() => router.push(`/events/${event.id}/edit`)}
                    onDetails={() => router.push(`/events/${event.id}`)}
                    onDelete={() => requestDelete(event.id, event.title)}
                />
            ))}
        </div>
    );
}
