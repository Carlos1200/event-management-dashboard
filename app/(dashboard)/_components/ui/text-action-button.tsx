import { type TextActionButtonProps, VARIANT_CLASS } from "./types";

export const TextActionButton = ({
    variant = "default",
    className = "",
    type = "button",
    ...props
}: TextActionButtonProps) => {
    return (
        <button
            type={type}
            className={`inline-flex items-center justify-center rounded-md px-2 py-1 text-[22px] font-medium transition cursor-pointer ${VARIANT_CLASS[variant]} ${className}`}
            {...props}
        />
    );
};
