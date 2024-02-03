"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { EventsProvider } from "src/context";
import { queryClient } from "src/lib/queryClient";

type Props = {
  children: React.ReactNode;
};

export default function Events({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <EventsProvider>{children}</EventsProvider>
    </QueryClientProvider>
  );
}
