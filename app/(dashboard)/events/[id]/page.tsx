import type { Metadata } from "next";
import { EventDetailsView } from "@/app/(dashboard)/_components/events/event-details-view";

type EventDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
    title: "Event Details",
    description: "View event details, schedule information, and quick actions.",
};

export default async function EventDetailsPage({
    params,
}: EventDetailsPageProps) {
    const { id } = await params;
    return <EventDetailsView eventId={id} />;
}
