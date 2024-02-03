import { useEffect, useState } from "react";
import { useFetchEvents } from "src/api/events";
import { usePathname } from "src/routes/hook/use-pathname";
import EventDetailBanner from "./event-detail-banner";
import EventsService from "src/services/events";
import { useEventsContext } from "src/context/EventsContextProvider";

const EventDetail = () => {
  const pathname = usePathname();

  const [slug, setSlug] = useState<string | null>(null);

  const [eventDetail, setEventDetail] = useState<any>();

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("/").filter((part: string) => !!part);
      const slugPart = parts[parts.length - 1];

      setSlug(slugPart);
    }
  }, [pathname]);

  useEffect(() => {
    if (slug) {
      const fetchEventData = async () => {
        try {
          const eventData = await EventsService.list().then((res) => res.data?.events);

          const foundEventDetail = eventData?.find((eachEvent: any) => eachEvent.slug === slug);
          console.log(foundEventDetail, "foundEventDetail");

          if (foundEventDetail) setEventDetail(foundEventDetail);
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchEventData();
    }
  }, [slug]);

  console.log(slug, "slug in detail page====");

  console.log(eventDetail, "eventDetail===")
  const primaryBannerImg = eventDetail?.eventImages?.find((eachEventImg: any) => eachEventImg.isPrimary).imageurl;

  return (
    <>
      <EventDetailBanner bannerImg={primaryBannerImg} />
    </>
  );
};

export default EventDetail;
