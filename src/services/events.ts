import axiosInstance, { endpoints } from 'src/utils/axios';

const EventsService = {
  list: (queryParameters = {}) =>
    axiosInstance.get(endpoints.events.list(queryParameters)),
  create: (data: any) => axiosInstance.post(endpoints.events.create, data),
  update: (id: string, data: any) =>
    axiosInstance.put(endpoints.events.update(id), data),
  details: (id: any) => axiosInstance.get(endpoints.events.details(id)),
  remove: (id: string) => axiosInstance.patch(endpoints.events.remove(id)),
  removeItem: (id: string, data: any) =>
    axiosInstance.delete(endpoints.events.removeItem(id), { data }),
  addItem: (id: string, data: any) =>
    axiosInstance.post(endpoints.events.addItem(id), data),
};

export default EventsService;
