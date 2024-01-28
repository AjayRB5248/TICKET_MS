"use client";

import { QueryClientProvider } from "@tanstack/react-query";
// components
import CompactLayout from "src/layouts/compact";
import { queryClient } from "src/lib/queryClient";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <CompactLayout>{children}</CompactLayout>
    </QueryClientProvider>
  );
}
