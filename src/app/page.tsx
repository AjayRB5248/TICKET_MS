"use client";

import { EventsProvider } from "src/context";
import { HomeView } from "src/sections/home/view";

export default function HomePage() {
  return (
    <EventsProvider>
      <HomeView />
    </EventsProvider>
  );
}
