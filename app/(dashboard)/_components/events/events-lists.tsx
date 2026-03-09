"use client";

import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { sileo } from "sileo";
import { EventCard } from "./event-card";
import { useDeleteEventMutation } from "@/features/events/use-delete-event-mutation";
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
    const deleteEventMutation = useDeleteEventMutation();
    const { data: events = [], isLoading, isError, refetch } = useEventsQuery();

    const requestDelete = (id: string, title: string) => {
        sileo.action({
            title: "Delete this event?",
            description: `You are about to delete \"${title}\". This action cannot be undone.`,
            button: {
                title: "Delete",
                onClick: async () => {
                    try {
                        await deleteEventMutation.mutateAsync(id);
                        sileo.success({
                            title: "Event deleted",
                            description: "The event was removed successfully.",
                        });
                    } catch (error) {
                        sileo.error({
                            title: "Failed to delete event",
                            description:
                                error instanceof Error
                                    ? error.message
                                    : "Please try again in a moment.",
                        });
                    }
                },
            },
        });
    };

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

    return (
        <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => (
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
