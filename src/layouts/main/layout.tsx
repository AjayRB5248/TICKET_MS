"use client";
// routes
import { usePathname } from "src/routes/hook";

// layout
import Footer from "./footer";
import Header from "./header";

// font
import { mainFont } from "src/theme/typography";



// components
import Preloader from "../_common/preloader";
import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "src/lib/queryClient";

type Props = {
  children: React.ReactNode;
  headless?: Boolean;
};

export default function MainLayout({ children, headless }: Props) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`${mainFont.className} ${headless ? "headless-layout" : ""}`}>
        {/* <Preloader /> */}
        <Header />
        {children}
        <Footer />
      </div>
    </QueryClientProvider>
  );
}
