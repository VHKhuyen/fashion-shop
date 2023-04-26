import { useState } from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/cart.css";
import { formattedUnitPrice } from "../../utils/formatter";

const ProductCard = ({ data }) => {
  const { product_id, name, unit_price: price, images } = data;
  const [image, setImage] = useState("");
  const [color, setColor] = useState(0);

  const handleChangeImage = (index) => {
    setColor(index);
    setImage(images[index]);
  };

  return (
    <div
      className="rounded-lg cart-card transition duration-300 hover:text-[#222] "
      data-aos="fade-up"
    >
      <div className=" w-full mb-[10px] overflow-hidden rounded-t-lg bg-[#eceff1]">
        <Link to={`/products/${product_id}`}>
          <img
            src={image.imgUrl || images[0].imgUrl}
            alt=""
            className="h-auto max-w-full object-cover rounded-t-lg productImg"
          />
        </Link>
      </div>
      <div>
        <h3 className="lg:text-base h-12 hover:text-primary  md:text-lg text-sm leading-[18px]">
          <Link
            className="text-[16px] leading-[16px] capitalize"
            to={`/products/${product_id}`}
          >
            {name.toLowerCase()}
          </Link>
        </h3>
        <div className="mb-[7px]">
          <span className="font-bold text-base">
            {formattedUnitPrice(price)}
          </span>
        </div>
        <div>
          {images.map((img, index) => (
            <div key={index} className="avatar ">
              <div
                onClick={() => handleChangeImage(index)}
                className={`cursor-pointer ${
                  index === color && "border-primary"
                } border-[1px] hover:border-primary w-8 mr-3 rounded-full`}
              >
                <img src={img.imgUrl} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
