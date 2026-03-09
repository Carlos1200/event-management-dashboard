"use client";

import { sileo } from "sileo";
import { useDeleteEventMutation } from "./use-delete-event-mutation";

export function useEventDeleteAction() {
  const deleteEventMutation = useDeleteEventMutation();

  const requestDelete = (id: string, title: string) => {
    sileo.action({
      title: "Delete this event?",
      description: `You are about to delete \"${title}\". This action cannot be undone.`,
      button: {
        title: "Delete",
        onClick: async () => {
          try {
            await deleteEventMutation.mutateAsync(id);
            sileo.success({
              title: "Event deleted",
              description: "The event was removed successfully.",
            });
          } catch (error) {
            sileo.error({
              title: "Failed to delete event",
              description:
                error instanceof Error
                  ? error.message
                  : "Please try again in a moment.",
            });
          }
        },
      },
    });
  };

  return { requestDelete };
}
