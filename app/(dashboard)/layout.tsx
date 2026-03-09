import type { ReactNode } from "react";
import { Topbar } from "./_components/topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#f5f7fb] text-[#0f172a]">
            <div className="flex min-h-screen w-full pb-24 md:pb-0">
                <main className="flex min-w-0 flex-1 flex-col">
                    <Topbar title="Events" />
                    <section className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10">
                        <div className="h-full rounded-3xl border border-dashed border-[#d7dee9] bg-white/70">
                            {children}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}
