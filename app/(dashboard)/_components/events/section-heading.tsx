import { SectionHeadingProps } from "./event-types";

export const SectionHeading = ({ icon, title }: SectionHeadingProps) => {
    return (
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#13c8ec] uppercase">
            {icon}
            <span>{title}</span>
        </div>
    );
};
