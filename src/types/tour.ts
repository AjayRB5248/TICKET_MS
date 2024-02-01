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
  locations:ITourLocation[]
};

interface EventEnum {
  PLANNED: 'PLANNED',
  ONGOING: 'ONGOING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
}

export interface EventFormSchema {
  eventName: string;
  eventDescription: string;
  status:EventEnum;
  artists: {
    name: string;
    genre: string;
  }[];
  venues: {
    venueName: string;
    city: string;
    timeZone: string;
    eventDate: Date;
  }[];
  ticketSettings: {
    venueName: string;
    type: string;
    price: number;
    totalSeats: number;
  }[];
  posterImage: File | null; 
  images: File[]; 
}

