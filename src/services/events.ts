import axiosInstance, { endpoints } from 'src/utils/axios';

const EventsService = {
  list: () =>
    axiosInstance.get(endpoints.events.list),
  create: (data: any) =>
    axiosInstance.post(endpoints.events.create, data),
  update: (id: string ,data: any) =>
    axiosInstance.patch(endpoints.events.update(id), { ...data }),
  details: (id: string) => axiosInstance.get(endpoints.events.details(id)),
  remove: (id: string) =>
    axiosInstance.patch(endpoints.events.remove(id)),
};

export default EventsService;
