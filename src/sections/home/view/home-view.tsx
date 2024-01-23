"use client";
// layouts
import MainLayout from "src/layouts/main";

// components
import Banner from "../home-banner";
import TicketSearch from "../ticket-search";

export default function HomeView() {
  return (
    <MainLayout>
      <Banner />
      <TicketSearch />
    </MainLayout>
  );
}
