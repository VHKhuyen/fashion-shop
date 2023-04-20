import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductCard } from "../../components";
import { NextArrow, PrevArrow } from "../../components/Slider/Arrow";

const ListProductSlider = ({ products }) => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    // autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          vertical: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          vertical: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {products?.map((item, index) => (
        <ProductCard key={index} data={item} />
      ))}
    </Slider>
  );
};
export default ListProductSlider;
