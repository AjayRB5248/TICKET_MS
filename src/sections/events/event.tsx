import Image, { StaticImageData } from "next/image";
import React from "react";

interface EventProps {
  imageUrl: StaticImageData;
  date: string;
  month: string;
  title: string;
  venue: string;
}

const Event: React.FC<EventProps> = ({ imageUrl, date, month, title, venue }) => {
  console.log( imageUrl, date, month, title, venue, "props--")
  return (
    <div className="item">
      <div className="event-grid">
        <div className="movie-thumb c-thumb">
          <a href="#0">
            <Image src={imageUrl} alt="event" />
          </a>
          <div className="event-date">
            <h6 className="date-title">{date}</h6>
            <span>{month}</span>
          </div>
        </div>
        <div className="movie-content bg-one">
          <h5 className="title m-0">
            <a href="#0">{title}</a>
          </h5>
          <div className="movie-rating-percent">
            <span>{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
