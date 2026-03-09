import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-[#f5f7fb] px-4 py-10 text-[#0f172a] sm:px-6 md:px-8 md:py-14">
            <section className="mx-auto flex w-full max-w-4xl items-center justify-center">
                <div className="w-full rounded-3xl border border-dashed border-[#d7dee9] bg-white/85 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm sm:p-8 md:p-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#13c8ec]">
                        Error 404
                    </p>
                    <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm text-[#64748b] sm:text-base">
                        The page you are looking for does not exist or was
                        moved. You can go back to your events dashboard and
                        continue your flow.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            href="/"
                            className="inline-flex h-11 items-center justify-center rounded-xl bg-[#13c8ec] px-5 text-sm font-semibold text-white transition hover:bg-[#10b7d8]"
                        >
                            Go to dashboard
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
