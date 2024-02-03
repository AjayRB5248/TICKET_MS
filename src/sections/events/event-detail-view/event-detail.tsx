import { useEffect, useState } from "react";
import { useFetchEvents } from "src/api/events";
import { usePathname } from "src/routes/hook/use-pathname";

const EventDetail = () => {
  const pathname = usePathname();

  const { events } = useFetchEvents();

  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    if (pathname) {
      const parts = pathname.split("/").filter((part: string) => !!part);
      const slugPart = parts[parts.length - 1];

      setSlug(slugPart);
    }
  }, [pathname]);

  useEffect(() => {
    console.log(events, "events!!!!!")
    
    const eventDetail = events?.find((eachEvent: any) => eachEvent.slug === slug);
    console.log(eventDetail, "eventDetail")
  }, [slug]);

  console.log(slug, "slug in detail page====");
  return <div>Detail Page</div>;
};

export default EventDetail;
