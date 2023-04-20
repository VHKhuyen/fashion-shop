import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PromotionCard from "../Cards/PromotionCard";
import { NextArrow, PrevArrow } from "./Arrow";

const promotions = [
  {
    id: "4b2f-a74d-124e13b9-112a-a77b362d6ead",
    category: "Women Cloth",
    name: "Comfort Girl Gown",
    seller: "Rong Moshal",
    price: 310,
    stock: 20,
    ratings: 4,
    ratingsCount: 432,
    img: "https://pngimg.com/d/dress_PNG156.png",
    shipping: 1,
    quantity: 0,
    off: 15,
    bg: "https://images.unsplash.com/photo-1499939667766-4afceb292d05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
  },
  {
    id: "4b2f-df4a-124e13b9-3421-a77b362d6ead",
    category: "Women Cloth",
    name: "Winter Red Sweater",
    seller: "Grass Cotton",
    price: 320,
    stock: 20,
    ratings: 4,
    ratingsCount: 221,
    img: "https://www.nicepng.com/png/full/912-9127357_sweater-png-red-sweater-transparent-background.png",
    shipping: 1,
    quantity: 0,
    off: 50,
    bg: "https://images.unsplash.com/photo-1511511450040-677116ff389e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80",
  },
  {
    id: "4b2f-a74d-1234rtb9-2d54-a77b362d6ead",
    category: "Men Cloth",
    name: "Modern T-shirt",
    seller: "Ring Top",
    price: 220,
    stock: 20,
    ratings: 4,
    ratingsCount: 112,
    img: "https://purepng.com/public/uploads/large/purepng.com-mint-green-t-shirtt-shirtfabrict-shapegramnetsmint-green-1421526429357cthld.png",
    shipping: 1,
    quantity: 0,
    off: 25,
    bg: "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
];

const PromotionSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 700,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    autoplaySpeed: 3500,
    pauseOnHover: false,
    cssEase: "linear",
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
