export const CreateEventFormSkeleton = () => {
    return (
        <div className="mx-auto w-full max-w-4xl px-5 py-6 sm:px-8 sm:py-8">
            <div className="space-y-8">
                <section className="space-y-4">
                    <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />
                    <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-28 w-full animate-pulse rounded-xl bg-slate-200" />
                </section>

                <section className="space-y-4 border-t border-[#edf2f7] pt-7">
                    <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
                        <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
                    </div>
                </section>

                <section className="space-y-4 border-t border-[#edf2f7] pt-7">
                    <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                    <div className="h-12 w-full animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-6 w-36 animate-pulse rounded bg-slate-200" />
                </section>

                <div className="flex justify-end gap-3 border-t border-[#edf2f7] pt-6">
                    <div className="h-10 w-20 animate-pulse rounded-xl bg-slate-200" />
                    <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200" />
                </div>
            </div>
        </div>
    );
};
