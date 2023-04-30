import { Link } from "react-router-dom";
import "../../assets/styles/style.css";
import { formattedUnitPrice } from "../../utils/formatter";

const NewArrivalCard = ({ data, bg }) => {
  const { product_id: id, name, unit_price: price, images } = data;

  return (
    <Link to={`/products/${id}`}>
      <div
        className="w-full h-full flex justify-between items-center rounded px-6 py-4 lg:my-2 product"
        style={{ backgroundColor: `${bg}` }}
      >
        <div>
          <h3 className="line-clamp-2 font-semibold h-12 overflow-ellipsis overflow-hidden">
            {name}
          </h3>
          <h4 className="mt-2">{formattedUnitPrice(price)}</h4>
        </div>
        <img
          className="lg:h-[100px] md:h-[80px] h-[100px] rounded-md productImg"
          src={images[0].imgUrl}
          alt=""
        />
      </div>
    </Link>
  );
};

export default NewArrivalCard;
