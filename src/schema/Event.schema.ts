import { EventStatusEnum } from 'src/sections/tour/utils';
import * as Yup from 'yup';

export const EventSchema = Yup.object().shape({
  eventName: Yup.string().required('Event name is required'),
  eventDescription: Yup.string().required('Event description is required'),
  eventCategory: Yup.string().required('Event Category is required'),
  status: Yup.string()
    .required('Event Status is Required')
    .oneOf(Object.values(EventStatusEnum), 'Invalid event status'),
  posterImage: Yup.mixed()
    .nullable()
    .required('Poster image is required')
    .test('validImageOrUrl', 'Invalid image or URL', (value) => {
      if (!value) return true; // Allow null or undefined
      // Check if the value is a valid URL
      if (typeof value === 'string' && Yup.string().url().isValidSync(value)) {
        return true; // It's a valid URL
      }
      // Check if the value is a valid file type
      if (value instanceof File) {
        // Add your file type validation logic here
        return ['image/jpeg', 'image/jpg', 'image/png'].includes(value.type);
      }
      return false; // Neither a valid URL nor a valid file type
    }),
  artists: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Artist name is required'),
      genre: Yup.string().optional(),
      category: Yup.string().required('Artist cateogry is required'),
    })
  ),
  videoUrl: Yup.string().optional(),
  venues: Yup.array().of(
    Yup.object().shape({
      venueName: Yup.string().required('Venue name is required'),
      city: Yup.string().required('City is required'),
      timeZone: Yup.string().required('Time zone is required'),
      dateOfEvent: Yup.date().required('Date of event is required'),
    })
  ),
  ticketSettings: Yup.array().of(
    Yup.object().shape({
      venueName: Yup.string().required('Venue name is required'),
      type: Yup.string().required('Ticket type is required'),
      price: Yup.number()
        .positive('Price must be positive')
        .required('Price is required'),
      totalSeats: Yup.number()
        .integer()
        .positive('Total seats must be a positive integer')
        .required('Total seats are required'),
    })
  ),
  images: Yup.array().optional(),
  tags: Yup.array().of(Yup.string()).required('At least one tag is required'),
});
