import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import image1 from "../images/amazonHome.jpg";
import image2 from "../images/beautiSection.jpg";
import image3 from "../images/Electronics.jpg";
import image4 from "../images/shipping.jpg";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
      >
        <div>
          <img loading="lazy" src={image1} alt="bannerImage" />
        </div>
        <div>
          <img loading="lazy" src={image2} alt="bannerImage" />
        </div>
        <div>
          <img loading="lazy" src={image3} alt="bannerImage" />
        </div>
        <div>
          <img loading="lazy" src={image4} alt="bannerImage" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
