import BannerBg from "src/assets/frontend/images/banner/banner12.jpg";
import { TypeAnimation } from "react-type-animation";

const Banner = () => {
  return (
    <section className="banner-section">
      <div className="banner-bg bg_img bg-fixed" style={{ backgroundImage: `url(${BannerBg.src})` }}></div>
      <div className="container">
        <div className="banner-content">
          <h1 className="title  cd-headline clip">
            <span className="d-block">book your</span> tickets for {""}
            <TypeAnimation
              sequence={["Concerts", 1000, "Sports", 1000, "Events", 1000, "Movies", 1000]}
              wrapper="span"
              speed={1}
              style={{ display: "inline-block", color: "#31d7a9" }}
              repeat={Infinity}
            />
          </h1>
          <p>Safe, secure, reliable ticketing.Your ticket to live entertainment!</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
