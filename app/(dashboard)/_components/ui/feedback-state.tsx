import { FeedbackStateProps } from "./types";

const toneClasses = {
    neutral: "border-slate-200 bg-white text-slate-800",
    error: "border-red-200 bg-red-50 text-red-800",
} as const;

export const FeedbackState = ({
    icon,
    title,
    description,
    action,
    tone = "neutral",
}: FeedbackStateProps) => {
    return (
        <div className="flex min-h-[50vh] w-full items-center justify-center p-3 sm:p-4">
            <div
                className={`w-full max-w-xl rounded-2xl border p-5 sm:p-6 ${toneClasses[tone]}`}
            >
                <div className="flex items-start gap-3">
                    {icon ? <div className="mt-0.5">{icon}</div> : null}
                    <div>
                        <h3 className="text-base font-semibold">{title}</h3>
                        {description ? (
                            <p className="mt-1 text-sm opacity-90">
                                {description}
                            </p>
                        ) : null}
                        {action ? <div className="mt-4">{action}</div> : null}
                    </div>
                </div>
            </div>
        </div>
    );
};
