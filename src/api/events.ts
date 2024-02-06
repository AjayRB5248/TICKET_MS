import { useMutation, useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { useEventsContext } from 'src/context/EventsContextProvider';
import { useRouter } from 'src/routes/hook';
import { paths } from 'src/routes/paths';
import EventsService from 'src/services/events';

interface Filters {
  eventName: string;
  city: string;
  eventDate: string;
  venueName: string;
}

export function useEvent(id: any) {
  const { data, isLoading, error } = useQuery(['events/id', id], async () => {
    const res = await EventsService.details(id);
    return res?.data?.event;
  });

  const event = useMemo(() => data || {}, [data]);

  return {
    event,
    isLoading,
    error,
  };
}

export function useEvents(queryParameters?: any) {
  const { data, isLoading, error } = useQuery(
    ['events'],
    async () => {
      const res = await EventsService.list(queryParameters);
      return res?.data?.events;
    },
    {
      keepPreviousData: true,
    }
  );

  const events = useMemo(() => data || [], [data]);

  return {
    events,
    loading: isLoading,
    error,
  };
}

export function useCreateEvent() {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['event/create'],
    async (formData: FormData) => {
      console.log('this is data', formData);

      const response = await EventsService.create(formData);
      return response?.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error creating event', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Event created successfully', { variant: 'success' });
        router.push(paths.dashboard.tour.root);
      },
    }
  );
}

export function useRemoveEvent() {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['event/remove'],
    async (eventId: string) => {
      const res = await EventsService.remove(eventId);
      return res?.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Removing Event', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Event Removed Successfully', { variant: 'success' });
      },
    }
  );
}

export const useFetchEvents = (queryData?: Filters) => {
  const { setEvents } = useEventsContext();

  const { data, isLoading, isError, isFetching, error } = useQuery(
    ['events', queryData],
    async () => {
      const events = await EventsService.list(queryData).then(
        (res) => res?.data?.events
      );

      setEvents(events);
      return events;
    }
  );

  return {
    events: data || [],
    loading: isLoading,
    error: isError ? error : null,
    isFetching,
  };
};
