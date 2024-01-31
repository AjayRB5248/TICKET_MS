import BannerImg from "src/assets/frontend/images/banner/banner11.jpeg";

const BannerHeader = () => {
  return (
    <section className="banner-section">
      <div className="banner-bg bg_img" style={{ backgroundImage: `url(${BannerImg.src})` }}></div>
      <div className="container">
        <div className="banner-content event-content">
          <h1 className="title bold">
            get <span className="color-theme">events</span> tickets
          </h1>
          <p>Buy event tickets in advance, find event times and much more</p>
        </div>
      </div>
    </section>
  );
};

export default BannerHeader;
