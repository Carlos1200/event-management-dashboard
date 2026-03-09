export const eventsKeys = {
  all: ["events"] as const,
  list: () => [...eventsKeys.all, "list"] as const,
};