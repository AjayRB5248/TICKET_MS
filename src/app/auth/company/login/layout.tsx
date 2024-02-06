"use client";

import { QueryClientProvider } from "@tanstack/react-query";
// auth
import { GuestGuard } from "src/auth/guard";
// components
import AuthClassicLayout from "src/layouts/auth/classic";
import { queryClient } from "src/lib/queryClient";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <GuestGuard>
        <AuthClassicLayout>
          {children}
        </AuthClassicLayout>
      </GuestGuard>
    </QueryClientProvider>
  );
}
