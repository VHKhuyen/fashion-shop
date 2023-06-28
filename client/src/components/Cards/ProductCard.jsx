import { useState } from "react";
import { Link } from "react-router-dom";
import { formattedUnitPrice } from "../../utils/formatter";
import "../../assets/styles/style.css";

const ProductCard = ({ data }) => {
  const { name, price, images, alias } = data;
  const [image, setImage] = useState(images[0].src);
  const [color, setColor] = useState(images[0].id);

  const handleChangeImage = (id, imgUrl) => {
    setColor(id);
    setImage(imgUrl);
  };

  return (
    <div className="cart-card transition duration-300 hover:text-[#222]">
      <Link to={`/products/${alias}`}>
        <div className="productImg relative rounded-lg max-h-80 w-full mb-[10px] overflow-hidden rounded-t-lg bg-[#eceff1]">
          <img src={image} alt="image" />
        </div>
      </Link>
      <div>
        <h3 className="lg:text-base h-12 md:text-lg text-sm leading-[18px]">
          <Link
            className="text-[16px] leading-[16px] capitalize hover:text-primary"
            to={`/products/${alias}`}
          >
            {name}
          </Link>
        </h3>
        <div className="mb-[7px]">
          <span className="font-bold text-base">
            {formattedUnitPrice(price)}
          </span>
        </div>
        <div>
          {images.map((img) => (
            <div key={img.id} className="avatar">
              <div
                onClick={() => handleChangeImage(img.id, img.src)}
                className={`cursor-pointer ${
                  img.id === color && "border-primary"
                } border-[1px] hover:border-primary w-8 mr-3 rounded-full`}
              >
                <img src={img.src} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
