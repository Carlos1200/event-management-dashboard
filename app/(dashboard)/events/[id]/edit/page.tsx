import { EditEventView } from "@/app/(dashboard)/_components/events/edit-event-view";

type EditEventPageProps = {
    params: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: EditEventPageProps) {
    const { id } = await params;
    return <EditEventView eventId={id} />;
}
