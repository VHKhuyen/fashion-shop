import { Link } from "react-router-dom";
import { formattedUnitPrice } from "../../utils/formatter";

const SearchProductCard = (props) => {
  const { alias, name, images, unit_price, setSearchValue } = props;

  return (
    <Link to={`/products/${alias}`}>
      <div
        className="bg-base-100 flex my-2 hover:bg-slate-100 transition"
        onClick={() => setSearchValue("")}
      >
        <div className="w-12">
          <img
            className="rounded-[4px] w-full h-full"
            src={images[0].imgUrl}
            alt="Avatar"
          />
        </div>
        <div className="ml-2">
          <div className="font-semibold transition text-sm">{name}</div>
          <div className="text-sm mt-2">
            <p>{formattedUnitPrice(unit_price)}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchProductCard;
