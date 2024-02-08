// ----------------------------------------------------------------------

export type ITourFilterValue = string | string[] | Date | ITourGuide[] | null;

export type ITourFilters = {
  tourGuides: ITourGuide[];
  destination: string[];
  services: string[];
  startDate: Date | null;
  endDate: Date | null;
};

// ----------------------------------------------------------------------

export type ITourGuide = {
  id: string;
  name: string;
  avatarUrl: string;
  phoneNumber: string;
};

export type ITourBooker = {
  id: string;
  name: string;
  avatarUrl: string;
  guests: number;
};

export type ITourLocation = {
  cityName: string;
  venue: string;
  availableSeats: string; // or number, as per your requirement
  ticketPrice: number;
  eventDateTime: Date | null; // Adding the eventDateTime field
};

export type ITourItem = {
  id: string;
  name: string;
  price: number;
  totalViews: number;
  tags: string[];
  content: string;
  publish: string;
  images: string[];
  durations: string;
  priceSale: number;
  services: string[];
  destination: string;
  ratingNumber: number;
  bookers: ITourBooker[];
  tourGuides: ITourGuide[];
  createdAt: Date;
  available: {
    startDate: Date;
    endDate: Date;
  };
  locations: ITourLocation[];
};

interface EventEnum {
  PLANNED: 'PLANNED';
  ONGOING: 'ONGOING';
  COMPLETED: 'COMPLETED';
  CANCELLED: 'CANCELLED';
}

export interface ITicketType {
  _id: string;
  soldSeats: number;
  eventId: string;
  venueId: string;
  eventOwner: string;
  type: string;
  price: number;
  totalSeats: number;
  availableSeats: number;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export type TArtist = {
  _id: string;
  artistName: string;
  genre: string;
  category: string;
};

export type TVenue = {
  _id: string;
  venueName: string;
  city: string;
  timeZone: string;
  eventDate: string;
};

export type TEventImage = {
  isPrimary: boolean;
  _id: string;
  imageurl: string;
};

export type IEvent = {
  _id: string;
  status: string;
  ticketTypes: ITicketType[];
  tags: string[];
  isDeleted: boolean;
  eventName: string;
  eventDescription: string;
  eventOwner: string;
  artists: TArtist[];
  venues: TVenue[];
  eventImages: TEventImage[];
  eventCategory: string;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
};
