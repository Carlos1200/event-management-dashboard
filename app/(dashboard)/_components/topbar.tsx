"use client";

import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { AddEventButton } from "./add-event-button";

type TopbarProps = {
    title: string;
};

export function Topbar({ title }: TopbarProps) {
    const pathname = usePathname();
    const hideActions =
        pathname === "/events/new" || pathname.endsWith("/edit");

    return (
        <header className="border-b border-[#e6ebf2] bg-white px-4 pb-4 pt-6 sm:px-6 md:px-8 md:py-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
                <h1 className="text-[44px] font-extrabold leading-none tracking-tight md:text-4xl">
                    {title}
                </h1>

                {!hideActions ? (
                    <div className="flex items-center gap-3 md:w-full md:max-w-155 md:justify-end">
                        <div className="relative w-full md:max-w-105">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b8794]" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="h-16 w-full rounded-3xl border border-[#e2e8f0] bg-[#f1f5f9] pl-14 pr-4 text-4 font-medium text-[#334155] outline-none ring-0 placeholder:text-[#7b8794] focus:border-[#13c8ec] focus:bg-white md:h-11 md:rounded-xl md:text-sm"
                            />
                        </div>
                        <AddEventButton />
                    </div>
                ) : null}
            </div>
        </header>
    );
}
