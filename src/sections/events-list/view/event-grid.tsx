import moment from "moment";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const EventGridItem: React.FC<{
  imageUrl: StaticImageData;
  date: string;
  title: string;
  venue: string;
  city: string;
  timeZone: string;
  slug: string;
}> = ({ imageUrl, date, title, venue, city, timeZone, slug }) => {

  return (
    <div className="col-sm-6 col-lg-4">
      <div className="event-grid">
        <div className="movie-thumb c-thumb">
          <Link href={`/event-detail/${slug}`}>
            <Image src={imageUrl} alt="event" width={800} height={1200} />
          </Link>
          <div className="event-date">
            <h6 className="date-title">{moment(date).format("D")}</h6>
            <span>{moment(date).format("MMM")}</span>
          </div>
        </div>
        <div className="movie-content bg-one">
          <h5 className="title m-0">
            <Link href={`/event-detail/${slug}`}>{title}</Link>
          </h5>
          <div className="movie-rating-percent">
            <span>
              {venue} , {city}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventGridItem;
