import type { Metadata } from "next";
import { EventsList } from "./_components/events/events-lists";

export const metadata: Metadata = {
    title: "Events",
    description: "Browse, search, and filter all events in your dashboard.",
};

export default function DashboardPage() {
    return <EventsList />;
}
