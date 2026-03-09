"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEvent } from "./events.api";
import { eventsKeys } from "./events.keys";

export function useDeleteEventMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteEvent(id),
    onSuccess: async (_data, deletedId) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: eventsKeys.list() }),
        queryClient.removeQueries({ queryKey: eventsKeys.detail(deletedId) }),
      ]);
    },
  });
}
