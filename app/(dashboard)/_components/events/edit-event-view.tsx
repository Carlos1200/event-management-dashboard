"use client";

import { AlertCircle } from "lucide-react";
import { useEventQuery } from "@/features/events/use-event-query";
import { CreateEventForm } from "./create-event-form";
import { FeedbackState } from "../ui/feedback-state";
import { RetryButton } from "../ui/retry-button";
import { EventsSkeleton } from "./events-skeleton";

type EditEventViewProps = {
    eventId: string;
};

export function EditEventView({ eventId }: EditEventViewProps) {
    const { data: event, isLoading, isError, refetch } = useEventQuery(eventId);

    if (isLoading) {
        return <EventsSkeleton />;
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

    return (
        <CreateEventForm mode="edit" eventId={eventId} initialEvent={event} />
    );
}
