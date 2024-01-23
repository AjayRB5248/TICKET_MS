import BannerBg from "src/assets/frontend/images/banner/banner12.jpg";

const Banner = () => {
  return (
    <section className="banner-section">
      <div className="banner-bg bg_img bg-fixed" style={{ backgroundImage: `url(${BannerBg.src})` }}></div>
      <div className="container">
        <div className="banner-content">
          <h1 className="title  cd-headline clip">
            <span className="d-block">book your</span> tickets for {""}
            <span className="color-theme cd-words-wrapper p-0 m-0">
              <b className="is-visible">Movie</b>
              <b>Event</b>
              <b>Sport</b>
            </span>
          </h1>
          <p>Safe, secure, reliable ticketing.Your ticket to live entertainment!</p>
        </div>
      </div>
    </section>
  );
};

export default Banner;
