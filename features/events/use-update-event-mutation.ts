"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEvent } from "./events.api";
import { eventsKeys } from "./events.keys";
import type { CreateEventInput } from "./events.types";

type UpdateEventVariables = {
  id: string;
  input: CreateEventInput;
};

export function useUpdateEventMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: UpdateEventVariables) => updateEvent(id, input),
    onSuccess: async (_data, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: eventsKeys.list() }),
        queryClient.invalidateQueries({ queryKey: eventsKeys.detail(variables.id) }),
      ]);
    },
  });
}
