import EventsService from "src/services/events";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useMemo } from "react";

export function useEvents() {
  const { data, isLoading, error } = useQuery(["events"], async () => {
    const res = await EventsService.list();
    return res?.data;
  });

  const events = useMemo(() => data || [], [data]);

  return {
    events,
    loading: isLoading,
    error,
  };
}

export function useEvent(id: string) {
  const { data, isLoading, error } = useQuery(["event/id", id], async () => {
    const res = await EventsService.details(id);
    return res?.data;
  });

  const event = useMemo(() => data || {}, [data]);

  return {
    event,
    isLoading,
    error,
  };
}

export function useCreateEvent() {
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ["event/create"],
    async (formData) => {
      const response = await EventsService.create(formData);
      return response?.data;
    },
    {
      onError: () => {
        enqueueSnackbar("Error creating event", { variant: "error" });
      },
      onSuccess: () => {
        enqueueSnackbar("Event created successfully", { variant: "success" });
      },
    }
  );
}

export function useRemoveEvent() {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ["event/remove"],
    async (eventId: string) => {
      const res = await EventsService.remove(eventId);
      return res?.data;
    },
    {
      onError: () => {
        enqueueSnackbar("Error Removing Event", { variant: "error" });
      },
      onSuccess: () => {
        enqueueSnackbar("Event Removed Successfully", { variant: "success" });
      },
    }
  );
}
