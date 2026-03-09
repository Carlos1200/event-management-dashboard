export const EventDetailsSkeleton = () => {
    return (
        <div className="mx-auto w-full max-w-6xl space-y-5 p-3 sm:p-4 md:p-6">
            <div className="flex items-center justify-between">
                <div className="h-5 w-28 animate-pulse rounded bg-slate-200" />
                <div className="flex gap-3">
                    <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200" />
                </div>
            </div>

            <article className="rounded-3xl border border-[#e5e7eb] bg-white p-5 sm:p-6">
                <div className="h-6 w-44 animate-pulse rounded bg-slate-200" />
                <div className="mt-4 h-10 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#edf2f7] pt-5 md:grid-cols-2">
                    <div className="h-16 w-full animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-16 w-full animate-pulse rounded-xl bg-slate-200" />
                </div>
            </article>

            <section className="rounded-3xl border border-[#e5e7eb] bg-white p-6 sm:p-7">
                <div className="h-8 w-52 animate-pulse rounded bg-slate-200" />
                <div className="mt-4 space-y-3">
                    <div className="h-5 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-11/12 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-10/12 animate-pulse rounded bg-slate-200" />
                    <div className="h-5 w-9/12 animate-pulse rounded bg-slate-200" />
                </div>
            </section>
        </div>
    );
};
