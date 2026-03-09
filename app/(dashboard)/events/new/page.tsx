import { NewEventView } from "@/app/(dashboard)/_components/events/new-event-view";

type NewEventPageProps = {
    searchParams: Promise<{ duplicateFrom?: string }>;
};

export default async function NewEventPage({
    searchParams,
}: NewEventPageProps) {
    const { duplicateFrom } = await searchParams;
    return <NewEventView duplicateFrom={duplicateFrom} />;
}
