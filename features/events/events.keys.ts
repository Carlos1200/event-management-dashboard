export const eventsKeys = {
  all: ["events"] as const,
  list: () => [...eventsKeys.all, "list"] as const,
  detail: (id: string) => [...eventsKeys.all, "detail", id] as const,
};