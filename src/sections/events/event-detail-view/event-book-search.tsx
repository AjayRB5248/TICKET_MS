import Image from "next/image";
import React from "react";
import EventIcon1 from "src/assets/frontend/images/event/icon/event-icon01.png";
import EventIcon2 from "src/assets/frontend/images/event/icon/event-icon02.png";
import EventIcon3 from "src/assets/frontend/images/event/icon/event-icon01.png";

const EventBookSearch: React.FC<any> = ({ eventName, venues }) => {
  return (
    <section className="event-book-search padding-top pt-lg-0">
      <div className="container">
        <div className="event-search bg_img" data-background="./assets/images/ticket/ticket-bg01.jpg">
          <div className="event-search-top">
            <div className="left">
              <h3 className="title">{eventName}</h3>
            </div>
            <div className="right">
              <ul className="countdown">
                <li>
                  <h2>
                    <span className="days">00</span>
                  </h2>
                  <p className="days_text">days</p>
                </li>
                <li>
                  <h2>
                    <span className="hours">00</span>
                  </h2>
                  <p className="hours_text">hrs</p>
                </li>
                <li>
                  <h2>
                    <span className="minutes">00</span>
                  </h2>
                  <p className="minu_text">min</p>
                </li>
                <li>
                  <h2>
                    <span className="seconds">00</span>
                  </h2>
                  <p className="seco_text">sec</p>
                </li>
              </ul>
              <a href="#0" className="custom-button">
                book tickets
              </a>
            </div>
          </div>
          <div className="event-search-bottom">
            <div className="contact-side">
              {venues?.map((eachVenue: any) => (
                <div className="item">
                  <div className="item-thumb">
                    <Image src={EventIcon2} alt={eachVenue.venueName} />
                  </div>
                  <div className="item-content">
                    <span className="up">{eachVenue.venueName}</span>
                    <span>{eachVenue.city}</span>
                  </div>
                </div>
              ))}
            </div>
            <ul className="social-icons">
              <li>
                <a href="#0">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="#0" className="">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="#0" className="active">
                  <i className="fab fa-pinterest-p"></i>
                </a>
              </li>
              <li>
                <a href="#0" className="">
                  <i className="fab fa-google"></i>
                </a>
              </li>
              <li>
                <a href="#0">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventBookSearch;
