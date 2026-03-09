import { EventDetailsView } from "@/app/(dashboard)/_components/events/event-details-view";

type EventDetailsPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EventDetailsPage({
    params,
}: EventDetailsPageProps) {
    const { id } = await params;
    return <EventDetailsView eventId={id} />;
}
