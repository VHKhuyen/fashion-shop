import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import { Loading, NewArrivalCard } from "../../components";
import { NextArrow, PrevArrow } from "./ArrowSlider";
import { requestShop } from "../../utils/httpRequest";

const productsBg = ["#F0997D", "#F7E2D6", "#D7E9B9", "#FFE7CC", "#CEE5D0"];

const NewArrivalSlider = () => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 3000,
    vertical: true,
    pauseOnHover: true,
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await requestShop.get("/products/new");
        setProducts(response.data.metadata);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {products.length ? (
        <Slider {...settings}>
          {products.map((item, index) => (
            <NewArrivalCard key={index} bg={productsBg[index]} data={item} />
          ))}
        </Slider>
      ) : (
        <Loading />
      )}
    </div>
  );
};
export default NewArrivalSlider;
