import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { NextArrow, PrevArrow } from "./ArrowSlider";
import { PrimaryButton } from "../index";
import { banner1, banner2, banner3, banner4 } from "../../assets/images";
import "../../assets/styles/heroSlider.css";

const content = [
  {
    title: "Sang trọng",
    description: "Nơi bạn tìm thấy niềm tin khi mua sắm. Mua sắm dễ dàng!",
    image: banner1,
    backgroundColor: "#FECD70",
  },
  {
    title: "Thanh lịch",
    description:
      "Chúng tôi mang đến những mẫu thời trang phù hợp nhất cho bạn!",
    image: banner2,
    backgroundColor: "#A8D1D1",
  },
  {
    title: "Thoải mái",
    description:
      "Nâng tầm phong cách với những sản phẩm mới nhất của chúng tôi",
    image: banner3,
    backgroundColor: "#B1D7B4",
  },
  {
    title: "Thời trang",
    description: "Ghi dấu mốc của phong cách luôn đi đầu xu hướng. Nhanh lên!",
    image: banner4,
    backgroundColor: "#D6E4E5",
  },
];

const HeroSlider = () => {
  const settings = {
    dots: true,
    dotsClass: "slick-dots hero-dots",
    infinite: true,
    speed: 800,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <Slider {...settings}>
      {content.map((item, index) => (
        <div key={index} className="slide">
          <div
            className="image"
            style={{ backgroundColor: item.backgroundColor }}
          >
            <img
              src={item.image}
              alt="Person Shopping"
              className="relative z-10"
            />
          </div>
          <div className="info">
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold uppercase text-white">
              {item.title}
            </h1>
            <p className="mt-2 lg:mb-8 md:mb-8 mb-5 lg:text-lg md:text-lg text-sm w-3/4">
              {item.description}
            </p>
            <Link to="/products">
              <PrimaryButton>Mua ngay</PrimaryButton>
            </Link>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
