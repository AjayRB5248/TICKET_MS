"use client";

import MainLayout from "src/layouts/main/layout";
import { EventDetail } from "src/sections/events/event-detail-view";

export default function EventDetailPage() {
  return (
    <MainLayout>
      <EventDetail />
    </MainLayout>
  );
}
