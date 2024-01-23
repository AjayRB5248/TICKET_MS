export default function Preloader() {
  return (
    <>
      <div className="preloader">
        <div className="preloader-inner">
          <div className="preloader-icon">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div className="overlay"></div>
      <a href="#0" className="scrollToTop">
        <i className="fas fa-angle-up"></i>
      </a>
    </>
  );
}
