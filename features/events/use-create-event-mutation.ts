"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "./events.api";
import { eventsKeys } from "./events.keys";

export function useCreateEventMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: eventsKeys.list() });
    },
  });
}
