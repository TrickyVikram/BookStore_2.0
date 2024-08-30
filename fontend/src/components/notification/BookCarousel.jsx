import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"; // Import custom styles

const BookCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true, // Enable center mode for centered slides
    centerPadding: "0", // No padding around the centered slide
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="rhf-overline-carousal">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-sm-12">
            <Slider {...settings}>
              <div className="item">
                <a href="/paid">
                  <span>Best Seller</span>
                </a>
              </div>
              <div className="item">
                <a href="/paid">
                  <span>New Arrival</span>
                </a>
              </div>
              <div className="item">
                <a href="/paid">
                  <span>Computer</span>
                </a>
              </div>
              {/* Add more carousel items as needed */}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-arrow slick-next" onClick={onClick}>
      <span aria-label="Next">›</span>
    </button>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button className="slick-arrow slick-prev" onClick={onClick}>
      <span aria-label="Previous">‹</span>
    </button>
  );
};

export default BookCarousel;
