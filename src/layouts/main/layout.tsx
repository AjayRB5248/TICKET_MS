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

// plugin css
import "bootstrap/dist/css/bootstrap.min.css";
import "src/assets/frontend/css/all.min.css";
import "src/assets/frontend/css/animate.css";
import "src/assets/frontend/css/flaticon.css";
import "src/assets/frontend/css/magnific-popup.css";
import "src/assets/frontend/css/odometer.css";
import "src/assets/frontend/css/owl.carousel.min.css";
import "src/assets/frontend/css/owl.theme.default.min.css";
import "src/assets/frontend/css/animatedheadline.css";
import "react-phone-number-input/style.css";

// custom css
import "src/assets/frontend/sass/main.scss";

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
