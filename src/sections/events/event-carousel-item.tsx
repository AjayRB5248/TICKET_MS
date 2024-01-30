// EventCarouselItem.tsx
import React from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Event from "./event";
import { StaticImageData } from "next/image";

interface EventProps {
  imageUrl: StaticImageData;
  date: string;
  month: string;
  title: string;
  venue: string;
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
    nav: true,
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
      {events.map((event, index) => (
        <Event key={index} {...event} />
      ))}
    </OwlCarousel>
  );
};

export default EventCarouselItem;
