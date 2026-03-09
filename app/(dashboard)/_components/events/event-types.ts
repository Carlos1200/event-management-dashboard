import { ReactNode } from "react";

export const EVENT_STATUSES = [
  "confirmed",
  "pending",
  "draft",
  "cancelled",
] as const;

export type EventStatus = (typeof EVENT_STATUSES)[number];

type EventStatusMeta = {
  label: string;
  badgeClassName: string;
};

export const EVENT_STATUS_META: Record<EventStatus, EventStatusMeta> = {
  confirmed: {
    label: "Confirmed",
    badgeClassName: "bg-[#dcfce7] text-[#15803d]",
  },
  pending: {
    label: "Pending",
    badgeClassName: "bg-[#fef3c7] text-[#a16207]",
  },
  draft: {
    label: "Draft",
    badgeClassName: "bg-[#e2e8f0] text-[#475569]",
  },
  cancelled: {
    label: "Cancelled",
    badgeClassName: "bg-[#fee2e2] text-[#b91c1c]",
  },
};

export type EventCardProps = {
  eventCode: string;
  title: string;
  dateLabel: string;
  locationText: string;
  status: EventStatus;
  onEdit?: () => void;
  onDetails?: () => void;
  onDelete?: () => void;
};

export type SectionHeadingProps = {
    icon: ReactNode;
    title: string;
};