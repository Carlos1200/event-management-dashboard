import { CalendarDays, MapPin } from "lucide-react";
import { TextActionButton } from "../ui/text-action-button";
import { EVENT_STATUS_META, EventCardProps } from "./event-types";

export const EventCard = ({
    eventCode,
    title,
    dateLabel,
    locationText,
    status,
    onEdit,
    onDetails,
    onDelete,
}: EventCardProps) => {
    const statusMeta = EVENT_STATUS_META[status];

    return (
        <article className="rounded-3xl border border-[#e5e7eb] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
            <header className="flex items-center gap-3">
                <span
                    className={`inline-flex rounded-lg px-3 py-1 text-[28px] font-semibold leading-none sm:text-sm ${statusMeta.badgeClassName}`}
                >
                    {statusMeta.label}
                </span>
                <span className="text-[30px] font-medium text-[#94a3b8] sm:text-sm">
                    {eventCode}
                </span>
            </header>

            <h3 className="mt-3 text-[44px] font-bold leading-tight tracking-tight text-[#111827] sm:text-4xl">
                {title}
            </h3>

            <div className="mt-4 space-y-2.5 text-[34px] text-[#667085] sm:text-lg">
                <p className="flex items-center gap-2.5">
                    <CalendarDays className="h-5 w-5 text-[#13c8ec]" />
                    <span>{dateLabel}</span>
                </p>
                <p className="flex items-center gap-2.5">
                    <MapPin className="h-5 w-5 text-[#13c8ec]" />
                    <span>{locationText}</span>
                </p>
            </div>

            <footer className="mt-5 border-t border-[#eef2f7] pt-4">
                <div className="grid grid-cols-3 items-center">
                    <TextActionButton onClick={onEdit}>Edit</TextActionButton>
                    <TextActionButton onClick={onDetails}>
                        Details
                    </TextActionButton>
                    <TextActionButton variant="danger" onClick={onDelete}>
                        Delete
                    </TextActionButton>
                </div>
            </footer>
        </article>
    );
};
