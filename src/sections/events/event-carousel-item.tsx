// EventCarouselItem.tsx
import React from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Event from "./event";
import { StaticImageData } from "next/image";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

interface EventProps {
  imageUrl: StaticImageData;
  date: string;
  title: string;
  venue: string;
  city: string;
  timeZone: string;
}

interface EventCarouselItemProps {
  events: EventProps[];
}

const EventCarouselItem: React.FC<EventCarouselItemProps> = ({ events }) => {
  const options = {
    items: 4,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      900: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  return (
    <OwlCarousel className="owl-theme" {...options}>
      {events.map((event: any) =>
        event.venues.map((eachEventVenue: any) => (
          <Event
            key={eachEventVenue._id}
            imageUrl={event.eventImages.find((eventImg: any) => eventImg.isPrimary)?.imageurl}
            date={eachEventVenue.eventDate}
            title={event.eventName}
            venue={eachEventVenue.venueName}
            city={eachEventVenue.city}
            timeZone={eachEventVenue.timeZone}
            slug={event.slug}
          />
        ))
      )}
    </OwlCarousel>
  );
};

export default EventCarouselItem;
