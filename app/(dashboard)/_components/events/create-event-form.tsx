"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarDays, CircleAlert, MapPin } from "lucide-react";
import { sileo } from "sileo";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import {
    createEventFormSchema,
    eventStatusOptions,
    mapFormValuesToCreateEventInput,
    type CreateEventFormValues,
} from "@/features/events/events.schema";
import { useCreateEventMutation } from "@/features/events/use-create-event-mutation";
import { SectionHeadingProps } from "./event-types";

const inputClassName =
    "h-12 w-full rounded-xl border border-[#d7dee9] bg-white px-3 text-sm text-[#0f172a] outline-none transition focus:border-[#13c8ec]";

function SectionHeading({ icon, title }: SectionHeadingProps) {
    return (
        <div className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-[#13c8ec] uppercase">
            {icon}
            <span>{title}</span>
        </div>
    );
}

export function CreateEventForm() {
    const router = useRouter();
    const createEventMutation = useCreateEventMutation();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm<CreateEventFormValues>({
        resolver: yupResolver(createEventFormSchema),
        defaultValues: {
            title: "",
            status: "pending",
            startDate: "",
            startTime: "",
            locationText: "",
            isVirtual: false,
        },
    });

    const isVirtual = useWatch({
        control,
        name: "isVirtual",
        defaultValue: false,
    });

    useEffect(() => {
        if (!isVirtual) {
            return;
        }

        setValue("locationText", "", { shouldValidate: true });
        clearErrors("locationText");
    }, [clearErrors, isVirtual, setValue]);

    const onSubmit = async (values: CreateEventFormValues) => {
        try {
            await createEventMutation.mutateAsync(
                mapFormValuesToCreateEventInput(values),
            );
            sileo.success({
                title: "Event created",
                description: "Your event was created successfully.",
            });
            router.push("/");
            router.refresh();
        } catch (error) {
            sileo.error({
                title: "Failed to create event",
                description:
                    error instanceof Error
                        ? error.message
                        : "Please try again in a moment.",
            });
        }
    };

    return (
        <div className="mx-auto w-full max-w-4xl ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 px-5 py-6 sm:px-8 sm:py-8"
            >
                <section className="space-y-4">
                    <SectionHeading
                        icon={<CircleAlert className="h-4 w-4" />}
                        title="Basic Information"
                    />

                    <div className="space-y-1.5">
                        <label
                            className="text-sm font-semibold text-[#334155]"
                            htmlFor="title"
                        >
                            Event Title
                        </label>
                        <input
                            id="title"
                            className={inputClassName}
                            placeholder="e.g. Annual Tech Conference 2024"
                            {...register("title")}
                        />
                        {errors.title ? (
                            <p className="text-xs text-red-600">
                                {errors.title.message}
                            </p>
                        ) : null}
                    </div>

                    <div className="space-y-1.5">
                        <label
                            className="text-sm font-semibold text-[#334155]"
                            htmlFor="status"
                        >
                            Status
                        </label>
                        <select
                            id="status"
                            className={inputClassName}
                            {...register("status")}
                        >
                            {eventStatusOptions.map((statusOption) => (
                                <option key={statusOption} value={statusOption}>
                                    {statusOption[0].toUpperCase() +
                                        statusOption.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.status ? (
                            <p className="text-xs text-red-600">
                                {errors.status.message}
                            </p>
                        ) : null}
                    </div>
                </section>

                <section className="space-y-4 border-t border-[#edf2f7] pt-7">
                    <SectionHeading
                        icon={<CalendarDays className="h-4 w-4" />}
                        title="Date & Time"
                    />

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-1.5">
                            <label
                                className="text-sm font-semibold text-[#334155]"
                                htmlFor="startDate"
                            >
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                className={inputClassName}
                                {...register("startDate")}
                            />
                            {errors.startDate ? (
                                <p className="text-xs text-red-600">
                                    {errors.startDate.message}
                                </p>
                            ) : null}
                        </div>

                        <div className="space-y-1.5">
                            <label
                                className="text-sm font-semibold text-[#334155]"
                                htmlFor="startTime"
                            >
                                Start Time
                            </label>
                            <div className="relative">
                                <input
                                    id="startTime"
                                    type="time"
                                    className={`${inputClassName} pr-10`}
                                    {...register("startTime")}
                                />
                            </div>
                            {errors.startTime ? (
                                <p className="text-xs text-red-600">
                                    {errors.startTime.message}
                                </p>
                            ) : null}
                        </div>
                    </div>
                </section>

                <section className="space-y-4 border-t border-[#edf2f7] pt-7">
                    <SectionHeading
                        icon={<MapPin className="h-4 w-4" />}
                        title="Location"
                    />

                    <div className="space-y-1.5">
                        <label
                            className="text-sm font-semibold text-[#334155]"
                            htmlFor="locationText"
                        >
                            Location
                        </label>
                        <input
                            id="locationText"
                            disabled={isVirtual}
                            placeholder="Enter venue name, address or meeting link"
                            className={`${inputClassName} ${
                                isVirtual
                                    ? "cursor-not-allowed border-[#e2e8f0] bg-[#f8fafc] text-[#94a3b8]"
                                    : ""
                            }`}
                            {...register("locationText")}
                        />
                        {isVirtual ? (
                            <p className="text-xs text-[#64748b]">
                                Location is disabled while virtual event is
                                enabled.
                            </p>
                        ) : null}
                        {errors.locationText ? (
                            <p className="text-xs text-red-600">
                                {errors.locationText.message}
                            </p>
                        ) : null}
                    </div>

                    <label className="inline-flex cursor-pointer items-center gap-3 pt-1">
                        <input
                            type="checkbox"
                            className="peer sr-only"
                            {...register("isVirtual")}
                        />
                        <span className="relative h-6 w-11 rounded-full bg-[#d5dbe5] transition peer-checked:bg-[#13c8ec] after:absolute after:left-0.75 after:top-0.75 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-transform after:content-[''] peer-checked:after:translate-x-5" />
                        <span className="text-sm font-semibold text-[#334155]">
                            Virtual Event
                        </span>
                    </label>
                </section>

                <div className="flex items-center justify-end gap-3 border-t border-[#edf2f7] pt-6">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-xl px-4 py-2 text-sm font-semibold text-[#64748b] transition hover:text-[#334155]"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={createEventMutation.isPending}
                        className="rounded-xl bg-[#13c8ec] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_-12px_rgba(19,200,236,0.8)] transition hover:bg-[#10b7d8] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {createEventMutation.isPending
                            ? "Saving..."
                            : "Save Event"}
                    </button>
                </div>
            </form>
        </div>
    );
}
