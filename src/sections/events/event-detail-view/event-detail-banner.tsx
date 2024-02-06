import { StaticImageData } from "next/image";
import React from "react";

interface EventDetailBannerProps {
  bannerImg: string;
}
const EventDetailBanner: React.FC<EventDetailBannerProps> = ({ bannerImg }) => {
  return (
    <section className="event-banner-section bg_img" style={{ backgroundImage: `url(${bannerImg})` }}>
      <div className="container">
        <div className="event-banner">
          <a href="" className="video-popup">
            <span></span>
            <i className="flaticon-play-button"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default EventDetailBanner;
