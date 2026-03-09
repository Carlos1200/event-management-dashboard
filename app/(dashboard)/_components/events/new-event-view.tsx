"use client";

import { AlertCircle } from "lucide-react";
import { useEventQuery } from "@/features/events/use-event-query";
import { CreateEventForm } from "./create-event-form";
import { FeedbackState } from "../ui/feedback-state";
import { RetryButton } from "../ui/retry-button";
import { CreateEventFormSkeleton } from "./create-event-form-skeleton";

type NewEventViewProps = {
    duplicateFrom?: string;
};

export function NewEventView({ duplicateFrom }: NewEventViewProps) {
    const {
        data: sourceEvent,
        isLoading,
        isError,
        refetch,
    } = useEventQuery(duplicateFrom ?? "");

    if (duplicateFrom && isLoading) {
        return <CreateEventFormSkeleton />;
    }

    if (duplicateFrom && (isError || !sourceEvent)) {
        return (
            <FeedbackState
                tone="error"
                icon={<AlertCircle className="h-5 w-5 text-red-600" />}
                title="We couldn't load source event"
                description="Try again in a moment."
                action={<RetryButton onClick={() => refetch()} />}
            />
        );
    }

    return <CreateEventForm initialEvent={sourceEvent} />;
}
