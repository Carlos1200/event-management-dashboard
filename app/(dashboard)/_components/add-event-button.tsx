import { Plus } from "lucide-react";

export const AddEventButton = () => {
    return (
        <button className="inline-flex h-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-2xl bg-[#13c8ec] px-3 text-sm font-semibold text-white transition hover:bg-[#10b7d8] sm:h-12 sm:gap-2 sm:px-5 sm:text-lg">
            <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="max-[380px]:hidden sm:inline">Add Event</span>
        </button>
    );
};
