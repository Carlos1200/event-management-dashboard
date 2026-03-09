import * as yup from "yup";
import type { CreateEventInput, EventDto, EventStatus } from "./events.types";

export const eventStatusOptions = [
  "confirmed",
  "pending",
  "draft",
  "cancelled",
] as const;

export type CreateEventFormValues = {
  title: string;
  description: string;
  status: EventStatus;
  startDate: string;
  startTime: string;
  locationText: string;
  isVirtual: boolean;
};

export const createEventFormSchema: yup.ObjectSchema<CreateEventFormValues> = yup
  .object({
    title: yup
      .string()
      .trim()
      .min(3, "Title must have at least 3 characters")
      .max(120, "Title must have at most 120 characters")
      .required("Title is required"),
    description: yup
      .string()
      .trim()
      .min(10, "Description must have at least 10 characters")
      .max(1000, "Description must have at most 1000 characters")
      .required("Description is required"),
    status: yup
      .mixed<EventStatus>()
      .oneOf(eventStatusOptions)
      .required("Status is required"),
    startDate: yup
      .string()
      .required("Start date is required")
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Start date is invalid"),
    startTime: yup
      .string()
      .required("Start time is required")
      .matches(/^\d{2}:\d{2}$/, "Start time is invalid"),
    locationText: yup
      .string()
      .trim()
      .defined()
      .when("isVirtual", {
        is: true,
        then: (schema) =>
          schema.max(140, "Location must have at most 140 characters"),
        otherwise: (schema) =>
          schema
            .min(3, "Location must have at least 3 characters")
            .max(140, "Location must have at most 140 characters")
            .required("Location is required"),
      }),
    isVirtual: yup.boolean().required(),
  })
  .required();

export function mapFormValuesToCreateEventInput(
  values: CreateEventFormValues,
): CreateEventInput {
  return {
    title: values.title.trim(),
    description: values.description.trim(),
    status: values.status,
    startAt: `${values.startDate}T${values.startTime}`,
    locationText: values.isVirtual ? "" : values.locationText.trim(),
    isVirtual: values.isVirtual,
  };
}

export function mapEventToFormValues(event: EventDto): CreateEventFormValues {
  const startDate = new Date(event.startAt);
  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, "0");
  const day = String(startDate.getDate()).padStart(2, "0");
  const hours = String(startDate.getHours()).padStart(2, "0");
  const minutes = String(startDate.getMinutes()).padStart(2, "0");

  return {
    title: event.title,
    description: event.description ?? "",
    status: event.status,
    startDate: `${year}-${month}-${day}`,
    startTime: `${hours}:${minutes}`,
    locationText: event.locationText,
    isVirtual: event.isVirtual,
  };
}
