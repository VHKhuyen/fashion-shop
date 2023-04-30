import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NewArrivalCard } from "../../components";
import { useState, useEffect } from "react";
import { requestShop } from "../../utils/httpRequest";
const productsBg = ["#F0997D", "#F7E2D6", "#D7E9B9", "#FFE7CC", "#CEE5D0"];

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  transform-none hover:scale-[1.25] z-[1] right-0 transition-transform`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  transform-none hover:scale-[1.25] z-[1] left-0 transition-transform`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}
export default function NewArrivalSlider() {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    vertical: true,
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
        breakpoint: 750,
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

  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await requestShop.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <Slider {...settings}>
      {products?.map((item, index) => (
        <NewArrivalCard key={index} bg={productsBg[index]} data={item} />
      ))}
    </Slider>
  );
}
