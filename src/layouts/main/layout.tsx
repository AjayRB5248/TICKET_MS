"use client";
// routes
import { usePathname } from "src/routes/hook";

// layout
import Footer from "./footer";
import Header from "./header";

// font
import { mainFont } from "src/theme/typography";

// plugin css
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "src/assets/frontend/css/all.min.css";
import "src/assets/frontend/css/animatedheadline.css";

// custom css
import "src/assets/frontend/sass/main.scss";

// import "src/assets/frontend/css/animate.css";
// import "src/assets/frontend/css/flaticon.css";
// import "src/assets/frontend/css/magnific-popup.css";
// import "src/assets/frontend/css/odometer.css";
// import "src/assets/frontend/css/owl.carousel.min.css";
// import "src/assets/frontend/css/owl.theme.default.min.css";

// js
// import "src/assets/frontend/js/heandline.js";
// import "src/assets/frontend/js/jquery-3.3.1.min.js";
// import "src/assets/frontend/js/modernizr-3.6.0.min.js";
// import "src/assets/frontend/js/plugins.js";
// import "src/assets/frontend/js/isotope.pkgd.min.js";
// import "src/assets/frontend/js/magnific-popup.min.js";
// import "src/assets/frontend/js/owl.carousel.min.js";
// import "src/assets/frontend/js/wow.min.js";
// import "src/assets/frontend/js/countdown.min.js";
// import "src/assets/frontend/js/odometer.min.js";
// import "src/assets/frontend/js/viewport.jquery.js";
// import "src/assets/frontend/js/main.js";

// components
import Preloader from "../_common/preloader";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: Props) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <div className={mainFont.className}>
      {/* <Preloader /> */}
      <Header />
      {children}
      <Footer />
    </div>
  );
}
