import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Image, { StaticImageData } from "next/image";

// Events Images

import EventImg1 from "src/assets/frontend/images/event/event01.jpg";
import EventImg2 from "src/assets/frontend/images/event/event02.jpg";
import EventImg3 from "src/assets/frontend/images/event/event03.jpg";
import EventImg4 from "src/assets/frontend/images/event/event04.jpg";
import EventCarouselItem from "../event-carousel-item";
import { useState } from "react";
import { useFetchEvents } from "src/api/events";

interface EventData {
  imageUrl: StaticImageData;
  date: string;
  month: string;
  title: string;
  venue: string;
  tags?: string[];
}

const eventsData: EventData[] = [
  {
    imageUrl: EventImg1,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
  {
    imageUrl: EventImg2,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
  {
    imageUrl: EventImg3,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
  {
    imageUrl: EventImg4,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
];

const tabItems = [
  {
    id: 1,
    title: "Now Showing",
  },
  {
    id: 2,
    title: "Coming Soon",
  },
  {
    id: 3,
    title: "Exclusive",
  },
];

const EventsCarousel: React.FC = () => {
  const { events, loading, error, isFetching } = useFetchEvents();

  const [activeTab, setActiveTab] = useState<string>("Now Showing");

  // TODO: Tags Type ? Filter Accordingly
  const filteredEvents = events.filter((event: any) => !event.tags?.includes(activeTab));

  return (
    <section className="event-section padding-top padding-bottom bg-four">
      <div className="container">
        <div className="tab">
          <div className="section-header-2">
            <div className="left">
              <h2 className="title">events</h2>
              <p>Be sure not to miss these Event today.</p>
            </div>
            <ul className="tab-menu">
              {tabItems.map((tabItem) => (
                <li className={tabItem.title === activeTab ? "active" : ""} onClick={() => setActiveTab(tabItem.title)}>
                  {tabItem.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="tab-area mb-30-none">
            {activeTab === "Now Showing" && (
              <div className={`tab-item active`}>
                <EventCarouselItem events={filteredEvents} />
              </div>
            )}

            {activeTab === "Coming soon" && (
              <div className={`tab-item active`}>
                <EventCarouselItem events={filteredEvents} />
              </div>
            )}

            {activeTab === "Exclusive" && (
              <div className={`tab-item active`}>
                <EventCarouselItem events={filteredEvents} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsCarousel;
