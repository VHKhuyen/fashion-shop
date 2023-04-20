import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { NewArrivalCard } from "../../components";

const products = [
  {
    id: "124e13b9-2d54-4b2f-a74d-a771f45d6ead",
    category: "Women Cloth",
    name: "Black Kurta",
    seller: "Rong Moshal",
    price: 4200,
    stock: 20,
    ratings: 4,
    ratingsCount: 725,
    img: "https://th.bing.com/th/id/R.77a9e3bbf42520dbefedab2e3d197dde?rik=D9zdql879wR%2fqw&pid=ImgRaw&r=0",
    shipping: 1,
    quantity: 0,
    bg: "#F0997D",
  },
  {
    id: "a77b362d6ead-124e13b9-2d54-4b2f-a74d",
    category: "Men Cloth",
    name: "Formal Shirt for Men",
    seller: "Rong Moshal",
    price: 1600,
    stock: 20,
    ratings: 4,
    ratingsCount: 3450,
    img: "https://purepng.com/public/uploads/large/purepng.com-slim-fit-mens-full-shirtsbutton-front-shirtgarmentdressshirtfullslim-fit-1421526306937vseuy.png",
    shipping: 1,
    quantity: 0,
    bg: "#F7E2D6",
  },
  {
    id: "4b2f-124e13b9-2d54-a74d-a77b362d6ead",
    category: "Women Cloth",
    name: "Elegant Frok for Women",
    seller: "Rong Moshal",
    price: 3350,
    stock: 20,
    ratings: 4,
    ratingsCount: 112,
    img: "https://th.bing.com/th/id/R.e240f314159bd306a050dd19b2532ff3?rik=YZQf9yrabvd9gg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fdress-png--1300.png&ehk=nGSQoU%2bMIHQtMo4kJlTNjtxrJ8jeh6a1EbwVlprKNZ0%3d&risl=&pid=ImgRaw&r=0",
    shipping: 1,
    quantity: 0,
    bg: "#D7E9B9",
  },
  {
    id: "2d54-124e13b9-4b2f-a74d-a77b362d6ead",
    category: "Men Cloth",
    name: "Sky Blue Shirt for Men",
    seller: "Rong Moshal",
    price: 4200,
    stock: 20,
    ratings: 4,
    ratingsCount: 223,
    img: "https://purepng.com/public/uploads/large/purepng.com-mens-stylish-shirt-bluebutton-front-shirtgarmentdressshirtfullmensstylishblue-1421526306983zzdmy.png",
    shipping: 1,
    quantity: 0,
    bg: "#FFE7CC",
  },
  {
    id: "4b2f-a74d-124e13b9-2d54-a77b362d6ead",
    category: "Women Cloth",
    name: "Red Salower for Girl",
    seller: "Rong Moshal",
    price: 2600,
    stock: 20,
    ratings: 4,
    ratingsCount: 725,
    img: "https://pngimg.com/d/dress_PNG53.png",
    shipping: 1,
    quantity: 0,
    bg: "#CEE5D0",
  },
];

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
    <div className="lg:w-1/3 lg:h-[480px]">
      <div className="mb-3">
        <span className="bg-gradient text-white text-xs px-6 py-[5px] rounded-full">
          New Arival
        </span>
      </div>
      <Slider {...settings}>
        {products?.map((item, index) => (
          <NewArrivalCard key={index} data={item} />
        ))}
      </Slider>
    </div>
  );
}
