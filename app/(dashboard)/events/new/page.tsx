import type { Metadata } from "next";
import { NewEventView } from "@/app/(dashboard)/_components/events/new-event-view";

type NewEventPageProps = {
    searchParams: Promise<{ duplicateFrom?: string }>;
};

export const metadata: Metadata = {
    title: "Create Event",
    description:
        "Create a new event with schedule, location, and status settings.",
};

export default async function NewEventPage({
    searchParams,
}: NewEventPageProps) {
    const { duplicateFrom } = await searchParams;
    return <NewEventView duplicateFrom={duplicateFrom} />;
}
