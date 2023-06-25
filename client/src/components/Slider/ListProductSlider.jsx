import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { ProductCard } from "../../components";
import { NextArrow, PrevArrow } from "../../components/Slider/Arrow";

const ListProductSlider = ({ products }) => {
  const settings = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 800,
    swipeToSlide: true,
    draggable: false,
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
      {products?.map((item) => (
        <div key={item.product_id} className="px-2">
          <ProductCard data={item} />
        </div>
      ))}
    </Slider>
  );
};
export default ListProductSlider;
