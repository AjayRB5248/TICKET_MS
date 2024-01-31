"use client";

import { BannerHeader } from "src/components/banner-header";
import MainLayout from "src/layouts/main";
import TicketSearch from "../home/ticket-search";
import EventsListing from "./view/events-listing";

export default function EventsList() {
  return (
    <MainLayout>
      <BannerHeader />
      <TicketSearch />
      <EventsListing />
    </MainLayout>
  );
}
