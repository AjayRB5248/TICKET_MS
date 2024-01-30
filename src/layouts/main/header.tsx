import Navbar from "./nav";
import Image from "next/image";
import { useEffect, useState } from "react";
import Logo from "src/assets/frontend/images/hulyalogo.png";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const headerClass = isScrolled ? "header-section header-active" : "header-section";
  return (
    <header className={headerClass}>
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <a href="/">
              <Image width={200} src={Logo} alt="Logo" />
            </a>
          </div>
          <Navbar />
          <div className="header-bar d-lg-none">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>
  );
}
