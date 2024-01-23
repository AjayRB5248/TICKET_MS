import Image from "next/image";
import FooterLogo from "src/assets/frontend/images/footer/footer-logo.png";
import FooterBackground from "src/assets/frontend/images/newslater/newslater-bg01.jpg";

const socialIcons = [
  { iconClass: "fab fa-facebook-f", link: "#0" },
  { iconClass: "fab fa-twitter", link: "#0", isActive: true },
  { iconClass: "fab fa-pinterest-p", link: "#0" },
  { iconClass: "fab fa-google", link: "#0" },
  { iconClass: "fab fa-instagram", link: "#0" },
];

const footerLinks = [
  { label: "About", link: "#0" },
  { label: "Terms Of Use", link: "#0" },
  { label: "Privacy Policy", link: "#0" },
  { label: "FAQ", link: "#0" },
  { label: "Feedback", link: "#0" },
];
export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="newslater-section padding-bottom mt-50">
        <div className="container">
          <div className="newslater-container bg_img" style={{ backgroundImage: `url(${FooterBackground.src})` }}>
            <div className="newslater-wrapper">
              <h5 className="cate">subscribe to Boleto </h5>
              <h3 className="title">to get exclusive benifits</h3>
              <form className="newslater-form">
                <input type="text" placeholder="Your Email Address" />
                <button type="submit">subscribe</button>
              </form>
              <p>We respect your privacy, so we never share your info</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-top">
          <div className="logo">
            <a href="index-1.html">
              <Image src={FooterLogo} alt="Footer Image" />
            </a>
          </div>
          <ul className="social-icons">
            {socialIcons.map((item, index) => (
              <li key={index}>
                <a href={item.link}>
                  <i className={item.iconClass}></i>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-area">
            <div className="left">
              <p>
                Copyright © 2020.All Rights Reserved By <a href="#0">Boleto </a>
              </p>
            </div>
            <ul className="links">
              {footerLinks.map((item, index) => (
                <li key={index}>
                  <a href={item.link}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
