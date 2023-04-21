import { Link } from "react-router-dom";
import "../../assets/styles/cart.css";
import { avatar } from "../../assets/images";

const ProductCard = ({ data, setModalOpen }) => {
  const {
    product_id,
    name,
    description,
    unit_price: price,
    quantity_in_stock,
    ratingsCount,
    category,
    images,
    variants,
  } = data;

  return (
    <div
      className="rounded-lg cart-card transition duration-300 hover:text-[#222] "
      data-aos="fade-up"
    >
      <div className="lg:h-64 h-40 w-full mb-[10px] overflow-hidden rounded-t-lg bg-[#eceff1]">
        <Link to={`/products/${product_id}`}>
          <img
            src={images[0]?.imgUrl}
            alt=""
            className="h-full w-full object-cover rounded-t-lg productImg"
          />
        </Link>
      </div>
      <div>
        <h3
          className="lg:text-base  hover:text-primary  md:text-lg text-sm leading-[18px]"
          style={{ textTransform: "capitalize" }}
        >
          <Link to={`/products${product_id}`}>{name.toLowerCase()}</Link>
        </h3>
        <div className="mb-[7px]">
          <span className="font-bold text-base">{price}đ</span>
        </div>
        <div>
          {images.map((img, index) => (
            <div key={index} className="avatar ">
              <div className="cursor-pointer border-[1px] hover:border-primary w-8 mr-3 rounded-full">
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
