import { useState } from "react";
import { Link } from "react-router-dom";
import { formattedUnitPrice } from "../../utils/formatter";
import "../../assets/styles/style.css";

const ProductCard = ({ data }) => {
  const { product_id, name, unit_price: price, images } = data;
  const [image, setImage] = useState(images[0].imgUrl);
  const [color, setColor] = useState(images[0].img_id);

  const handleChangeImage = (id, imgUrl) => {
    setColor(id);
    setImage(imgUrl);
  };

  return (
    <div className="cart-card transition duration-300 hover:text-[#222]">
      <div className="productImg relative rounded-lg max-h-80 w-full mb-[10px] overflow-hidden rounded-t-lg bg-[#eceff1]">
        <Link to={`/products/${product_id}`}>
          <img src={image} alt="" />
        </Link>
      </div>
      <div>
        <h3 className="lg:text-base h-12 md:text-lg text-sm leading-[18px]">
          <Link
            className="text-[16px] leading-[16px] capitalize hover:text-primary"
            to={`/products/${product_id}`}
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
            <div key={img.img_id} className="avatar">
              <div
                onClick={() => handleChangeImage(img.img_id, img.imgUrl)}
                className={`cursor-pointer ${
                  img.img_id === color && "border-primary"
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
