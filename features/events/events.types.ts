export type EventStatus = "confirmed" | "pending" | "draft" | "cancelled";

export type EventDto = {
  id: string;
  eventCode: string;
  title: string;
  description: string;
  status: EventStatus;
  startAt: string;
  locationText: string;
  isVirtual: boolean;
};

export type CreateEventInput = {
  title: string;
  description: string;
  status: EventStatus;
  startAt: string;
  locationText: string;
  isVirtual: boolean;
};