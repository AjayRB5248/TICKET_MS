import Image from "next/image";
import React from "react";

const EventAbout: React.FC<any> = ({ eventName, eventDescription, eventPrimaryImg }) => {
  return (
    <section className="event-about padding-top padding-bottom">
      <div className="container">
        <div className="row justify-content-between flex-wrap-reverse">
          <div className="col-lg-7 col-xl-6">
            <div className="event-about-content">
              <div className="section-header-3 left-style m-0">
                <span className="cate">are you ready to attend?</span>
                <h2 className="title">{eventName}</h2>

                <p dangerouslySetInnerHTML={{ __html: eventDescription }} />

                <a href="#0" className="custom-button">
                  book tickets
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-7">
            <div className="event-about-thumb">
              <Image src={eventPrimaryImg} alt="event" width={800} height={1200} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventAbout;
