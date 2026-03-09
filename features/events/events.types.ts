export type EventStatus = "confirmed" | "pending" | "draft" | "cancelled";

export type EventDto = {
  id: string;
  eventCode: string;
  title: string;
  status: EventStatus;
  startAt: string;
  locationText: string;
  isVirtual: boolean;
};

export type CreateEventInput = {
  title: string;
  status: EventStatus;
  startAt: string;
  locationText: string;
  isVirtual: boolean;
};