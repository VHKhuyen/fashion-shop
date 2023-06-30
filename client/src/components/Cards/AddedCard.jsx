import { Link } from "react-router-dom";
import { formattedUnitPrice } from "../../utils/formatter";
import { toast } from "react-hot-toast";

const AddedCard = ({ name, image, size, color, price, t }) => {
  return (
    <div className="card w-72 bg-base-100 shadow-2xl p-4">
      <h3 className="font-semibold text-base mb-2">Đã thêm vào giỏ hàng!</h3>
      <div className="flex items-center">
        <div className="w-20">
          <img
            className="rounded-[4px] w-full h-full"
            src={image}
            alt="Avatar"
          />
        </div>
        <div className="ml-2">
          <div className="font-semibold transition text-sm">{name}</div>
          <div className="text-sm mt-2">
            <p>
              <span>{color}</span> / <span>{size}</span>
            </p>
            <p>{formattedUnitPrice(price)}</p>
          </div>
        </div>
      </div>
      <Link to="/cart">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="mt-4 btn btn-primary opacity-80 btn-wide btn-sm text-white"
        >
          Xem giỏ hàng
        </button>
      </Link>
    </div>
  );
};

export default AddedCard;
