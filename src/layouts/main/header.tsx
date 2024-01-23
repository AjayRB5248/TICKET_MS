import Navbar from "./nav";
import Image from "next/image";
import Logo from "src/assets/frontend/images/logo/logo.png";

export default function Header() {
  return (
    <header className="header-section">
      <div className="container">
        <div className="header-wrapper">
          <div className="logo">
            <a href="/">
              <Image src={Logo} alt="Logo" />
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
