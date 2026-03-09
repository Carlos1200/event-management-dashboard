import type { ButtonHTMLAttributes, ReactNode } from "react";

export type TextActionButtonVariant = "default" | "danger";

export type TextActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: TextActionButtonVariant;
};

export const VARIANT_CLASS: Record<TextActionButtonVariant, string> = {
  default: "text-[#334155] hover:text-[#0f172a]",
  danger: "text-[#ef4444] hover:text-[#dc2626]",
};

export type RetryButtonProps = {
    onClick: () => void;
    label?: string;
    className?: string;
};

export type FeedbackStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  tone?: "neutral" | "error";
};