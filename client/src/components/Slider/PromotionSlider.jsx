import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PromotionCard from "../Cards/PromotionCard";

const promotions = [
  {
    image:
      "https://savani.vn/images/banners/original/the-new-generation_1920x680_1679393403.png",
  },
  {
    image:
      "https://savani.vn/images/banners/original/bst-moi-nang-reo_1920x680_1681791528.png",
  },
  {
    image:
      "https://savani.vn/images/banners/original/uom_1920x680_1685528233.png",
  },
];

const PromotionSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 800,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <Slider {...settings}>
      {promotions?.map((item, index) => (
        <PromotionCard key={index} data={item} />
      ))}
    </Slider>
  );
};
export default PromotionSlider;
