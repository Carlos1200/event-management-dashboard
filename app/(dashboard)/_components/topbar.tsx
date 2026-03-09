"use client";

import { Search, SlidersHorizontal, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEventFiltersController } from "@/features/events/use-event-filters-controller";
import { AddEventButton } from "./add-event-button";

type TopbarProps = {
    title: string;
};

export function Topbar({ title }: TopbarProps) {
    const pathname = usePathname();
    const hideActions = pathname.startsWith("/events/");
    const {
        filters,
        hasAdvancedFilters,
        showAdvanced,
        setShowAdvancedManual,
        applyQuery,
        clearFilters,
        onSearchChange,
    } = useEventFiltersController();

    return (
        <header className="sticky top-0 z-30 border-b border-[#e6ebf2] bg-white/95 px-4 pb-4 pt-6 backdrop-blur-sm sm:px-6 md:px-8 md:py-5">
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-6">
                <h1 className="text-[44px] font-extrabold leading-none tracking-tight md:text-4xl">
                    {title}
                </h1>

                {!hideActions ? (
                    <div className="w-full md:max-w-155">
                        <div
                            role="search"
                            aria-label="Search and filter events"
                            className="flex items-center gap-3 md:justify-end"
                        >
                            <div className="relative w-full md:max-w-105 lg:max-w-120">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7b8794]" />
                                <label
                                    htmlFor="events-search"
                                    className="sr-only"
                                >
                                    Search events
                                </label>
                                <input
                                    id="events-search"
                                    name="q"
                                    type="text"
                                    defaultValue={filters.query}
                                    onChange={(event) =>
                                        onSearchChange(event.target.value)
                                    }
                                    placeholder="Search events..."
                                    aria-controls="events-list"
                                    className="h-16 w-full rounded-3xl border border-[#e2e8f0] bg-[#f1f5f9] pl-14 pr-4 text-4 font-medium text-[#334155] outline-none ring-0 placeholder:text-[#7b8794] focus:border-[#13c8ec] focus:bg-white md:h-11 md:rounded-xl md:text-sm"
                                />
                            </div>
                            <AddEventButton />
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowAdvancedManual((prev) => !prev)
                                }
                                aria-expanded={showAdvanced}
                                aria-controls="advanced-event-filters"
                                className="inline-flex items-center gap-2 rounded-lg border border-[#d7dee9] bg-white px-3 py-2 text-xs font-semibold text-[#334155] transition hover:bg-[#f8fafc]"
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Advanced filters
                            </button>

                            {(filters.query || hasAdvancedFilters) && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-1 rounded-lg border border-[#d7dee9] bg-white px-3 py-2 text-xs font-semibold text-[#64748b] transition hover:text-[#334155]"
                                >
                                    <X className="h-4 w-4" />
                                    Clear all
                                </button>
                            )}
                        </div>

                        {showAdvanced ? (
                            <div
                                id="advanced-event-filters"
                                className="mt-3 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-3 md:p-4"
                            >
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
                                    <label className="space-y-1">
                                        <span className="text-xs font-semibold text-[#64748b]">
                                            Event type
                                        </span>
                                        <select
                                            value={filters.mode}
                                            onChange={(event) =>
                                                applyQuery({
                                                    mode: event.target.value,
                                                })
                                            }
                                            className="h-10 w-full rounded-lg border border-[#d7dee9] bg-white px-3 text-sm text-[#334155] outline-none focus:border-[#13c8ec]"
                                        >
                                            <option value="">
                                                All event types
                                            </option>
                                            <option value="virtual">
                                                Virtual only
                                            </option>
                                            <option value="onsite">
                                                With location
                                            </option>
                                        </select>
                                    </label>

                                    <label className="space-y-1">
                                        <span className="text-xs font-semibold text-[#64748b]">
                                            Status
                                        </span>
                                        <select
                                            value={filters.status}
                                            onChange={(event) =>
                                                applyQuery({
                                                    status: event.target.value,
                                                })
                                            }
                                            className="h-10 w-full rounded-lg border border-[#d7dee9] bg-white px-3 text-sm text-[#334155] outline-none focus:border-[#13c8ec]"
                                        >
                                            <option value="">All status</option>
                                            <option value="confirmed">
                                                Confirmed
                                            </option>
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="draft">Draft</option>
                                            <option value="cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </label>

                                    <label className="space-y-1">
                                        <span className="text-xs font-semibold text-[#64748b]">
                                            From date
                                        </span>
                                        <input
                                            type="date"
                                            value={filters.dateFrom}
                                            onChange={(event) =>
                                                applyQuery({
                                                    from: event.target.value,
                                                })
                                            }
                                            className="h-10 w-full rounded-lg border border-[#d7dee9] bg-white px-3 text-sm text-[#334155] outline-none focus:border-[#13c8ec]"
                                        />
                                    </label>

                                    <label className="space-y-1">
                                        <span className="text-xs font-semibold text-[#64748b]">
                                            To date
                                        </span>
                                        <input
                                            type="date"
                                            value={filters.dateTo}
                                            onChange={(event) =>
                                                applyQuery({
                                                    to: event.target.value,
                                                })
                                            }
                                            className="h-10 w-full rounded-lg border border-[#d7dee9] bg-white px-3 text-sm text-[#334155] outline-none focus:border-[#13c8ec]"
                                        />
                                    </label>
                                </div>
                            </div>
                        ) : null}
                    </div>
                ) : null}
            </div>
        </header>
    );
}
