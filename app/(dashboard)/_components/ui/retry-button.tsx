import { RefreshCw } from "lucide-react";
import { RetryButtonProps } from "./types";

export const RetryButton = ({
    onClick,
    label = "Retry",
    className = "",
}: RetryButtonProps) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`inline-flex items-center gap-2 rounded-xl bg-[#13c8ec] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#10b7d8] ${className}`}
        >
            <RefreshCw className="h-4 w-4" />
            {label}
        </button>
    );
};
