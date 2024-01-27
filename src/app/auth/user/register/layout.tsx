"use client";

// auth
import { GuestGuard } from "src/auth/guard";
// components
import AuthClassicLayout from "src/layouts/auth/classic";
import MainLayout from "src/layouts/main/layout";

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

console.log("In layout.tsx");

export default function Layout({ children }: Props) {
  return (
    // <GuestGuard>
      <MainLayout headless>{children}</MainLayout>
    // </GuestGuard>
  );
}
