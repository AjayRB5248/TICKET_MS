import React, { ReactNode, createContext, useContext, useState } from "react";

interface Filters {
  eventName: string;
  city: string;
  eventDate: string;
  venueName: string;
  category: string;
}

interface EventsContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  events: Event[]; // Define your Event type as needed
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export const useEventsContext = () => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error("useEventsContext must be used within an EventsProvider");
  }
  return context;
};

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<Filters>({
    eventName: "",
    city: "",
    eventDate: "",
    venueName: "",
    category: "",
  });

  const [events, setEvents] = useState<Event[]>([]);

  return <EventsContext.Provider value={{ filters, setFilters, events, setEvents }}>{children}</EventsContext.Provider>;
};
