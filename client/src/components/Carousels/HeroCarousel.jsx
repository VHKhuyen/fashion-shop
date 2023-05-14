import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../index";
import { banner1, banner2, banner3, banner4 } from "../../assets/images";
import "./HeroCarousel.css";

const content = [
  {
    title: "Royal Vibe",
    description:
      "You one stop place to Shop with Confidence. Shopping is Easy!",
    image: banner1,
  },
  {
    title: "Elegant Styles",
    description: "We are offering the Fashion That Fits You Best. Grab Now!",
    image: banner2,
  },
  {
    title: "Comfort Fasion",
    description:
      "Elevate Your Style with our brand new products, Purchase Today!",
    image: banner3,
  },
  {
    title: "Stylish Look",
    description: "Remarks the landmark of Always On Trend courtesy, Hurry Up!",
    image: banner4,
  },
];

const HeroCarousel = () => {
  const [slideNumber, setSlideNumber] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (slideNumber === 4) {
        setSlideNumber(1);
      } else {
        setSlideNumber(slideNumber + 1);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [slideNumber]);
  return (
    <div className="slider">
      {content.map((item, index) => (
        <div
          key={index}
          className={`slide ${slideNumber === index + 1 && "active"}`}
        >
          <div
            className="image"
            style={
              (slideNumber === 1 && { backgroundColor: "#FECD70" }) ||
              (slideNumber === 2 && { backgroundColor: "#A8D1D1" }) ||
              (slideNumber === 3 && { backgroundColor: "#B1D7B4" }) ||
              (slideNumber === 4 && { backgroundColor: "#D6E4E5" })
            }
          >
            <img src={item.image} alt="" className="relative z-10" />
          </div>
          <div className="info">
            <h1 className="lg:text-5xl md:text-4xl text-2xl font-bold uppercase text-white">
              {item.title}
            </h1>
            <p className="mt-2 lg:mb-8 md:mb-8 mb-5 lg:text-lg md:text-lg text-sm lg:w-3/4 md:w-3/4">
              {item.description}
            </p>
            <Link to="/products">
              <PrimaryButton>Shop Now</PrimaryButton>
            </Link>
          </div>
        </div>
      ))}
      <div className="navigation">
        <div
          className={`navBtn ${slideNumber === 1 && "active"}`}
          onClick={() => setSlideNumber(1)}
        ></div>
        <div
          className={`navBtn ${slideNumber === 2 && "active"}`}
          onClick={() => setSlideNumber(2)}
        ></div>
        <div
          className={`navBtn ${slideNumber === 3 && "active"}`}
          onClick={() => setSlideNumber(3)}
        ></div>
        <div
          className={`navBtn ${slideNumber === 4 && "active"}`}
          onClick={() => setSlideNumber(4)}
        ></div>
      </div>
    </div>
  );
};

export default HeroCarousel;
