import Image, { StaticImageData } from "next/image";

const EventGridItem: React.FC<{ imageUrl: StaticImageData; date: string; title: string; location: string }> = ({
  imageUrl,
  date,
  title,
  location,
}) => (
  <div className="col-sm-6 col-lg-4">
    <div className="event-grid">
      <div className="movie-thumb c-thumb">
        <a href="event-details.html">
          <Image src={imageUrl} alt="event" width={800} height={1200} />
        </a>
        <div className="event-date">
          <h6 className="date-title">{date}</h6>
          <span>Dec</span>
        </div>
      </div>
      <div className="movie-content bg-one">
        <h5 className="title m-0">
          <a href="event-details.html">{title}</a>
        </h5>
        <div className="movie-rating-percent">
          <span>{location}</span>
        </div>
      </div>
    </div>
  </div>
);

export default EventGridItem;
