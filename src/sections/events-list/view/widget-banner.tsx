import Image, { StaticImageData } from "next/image";
import React from "react";

const WidgetBanner: React.FC<{ imgUrl: StaticImageData; imgAlt: string }> = ({ imgUrl, imgAlt }) => {
  return (
    <div className="widget-1 widget-banner">
      <div className="widget-1-body">
        <a href="#0">
          <Image src={imgUrl} alt={imgAlt} />
        </a>
      </div>
    </div>
  );
};

export default WidgetBanner;
