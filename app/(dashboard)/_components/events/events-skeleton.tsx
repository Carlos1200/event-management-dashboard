export const EventsSkeleton = () => {
    return (
        <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={`event-skeleton-${index}`}
                    className="rounded-3xl border border-[#e5e7eb] bg-white p-5 sm:p-6"
                >
                    <div className="h-6 w-28 animate-pulse rounded-lg bg-slate-200" />
                    <div className="mt-3 h-8 w-5/6 animate-pulse rounded-lg bg-slate-200" />
                    <div className="mt-4 space-y-2.5">
                        <div className="h-5 w-3/4 animate-pulse rounded bg-slate-200" />
                        <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
                    </div>
                    <div className="mt-5 border-t border-[#eef2f7] pt-4">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="h-7 animate-pulse rounded bg-slate-200" />
                            <div className="h-7 animate-pulse rounded bg-slate-200" />
                            <div className="h-7 animate-pulse rounded bg-slate-200" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
