"use client";

import { QueryClientProvider, queryClient } from "src/lib/queryClient";
// auth
import { GuestGuard } from "src/auth/guard";
// components
import AuthClassicLayout from "src/layouts/auth/classic";
import MainLayout from "src/layouts/main/layout";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    // <GuestGuard>
    <QueryClientProvider client={queryClient}>
      <MainLayout headless>{children}</MainLayout>
    </QueryClientProvider>
    // </GuestGuard>
  );
}
