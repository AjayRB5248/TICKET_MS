import { StaticImageData } from "next/image";
import EventImg1 from "src/assets/frontend/images/event/event01.jpg";
import EventImg2 from "src/assets/frontend/images/event/event02.jpg";
import EventImg3 from "src/assets/frontend/images/event/event03.jpg";
import EventImg4 from "src/assets/frontend/images/event/event04.jpg";

interface EventData {
  imageUrl: StaticImageData;
  date: string;
  month: string;
  title: string;
  venue: string;
  tags?: string[];
}

const mockEvent: EventData[] = [
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
  {
    imageUrl: EventImg1,
    date: "28",
    month: "DEC",
    title: "SACAR Concert",
    venue: "27 Montague Street, Sydney",
    tags: ["Now Showing", "Exclusive"],
  },
];

export default mockEvent;
