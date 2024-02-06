'use client';

// auth
import { QueryClientProvider } from '@tanstack/react-query';
import { AuthGuard } from 'src/auth/guard';
// components
import DashboardLayout from 'src/layouts/dashboard';
import { queryClient } from "src/lib/queryClient";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
    </QueryClientProvider>
  );
}
