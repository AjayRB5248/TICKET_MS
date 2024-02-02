import axiosInstance, { endpoints } from "src/utils/axios";

const EventsService = {
  list: (queryData?: { eventName?: string; city?: string; venueName?: string; artist?: string; eventDate?: string }) =>
    axiosInstance.get(endpoints.events.list, {
      params: queryData,
    }),
  create: (data: any) => axiosInstance.post(endpoints.events.create, data),
  update: (id: string, data: any) => axiosInstance.patch(endpoints.events.update(id), { ...data }),
  details: (id: string) => axiosInstance.get(endpoints.events.details(id)),
  remove: (id: string) => axiosInstance.patch(endpoints.events.remove(id)),
};

export default EventsService;
