import type { Metadata } from "next";
import { EditEventView } from "@/app/(dashboard)/_components/events/edit-event-view";

type EditEventPageProps = {
    params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
    title: "Edit Event",
    description: "Update event information, timing, and status.",
};

export default async function EditEventPage({ params }: EditEventPageProps) {
    const { id } = await params;
    return <EditEventView eventId={id} />;
}
