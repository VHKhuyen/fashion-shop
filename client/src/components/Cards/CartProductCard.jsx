import { useDispatch, useSelector } from "react-redux";
import { FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { formattedUnitPrice } from "../../utils/formatter";
import { decrQuantity, incrQuantity } from "../../redux/cartSlice";
import { open } from "../../redux/modalConfirmSlice";
import { cartSelector } from "../../redux/selector";
import "../../assets/styles/cart.css";

const CartProductCard = ({ data }) => {
  const { cartItems } = useSelector(cartSelector);
  const { image, name, size, color, price, quantity } = data;

  const dispatch = useDispatch();

  const handleDecrItem = (item) => {
    const { id, color, size } = item;
    const cartItem = cartItems.find(
      (p) => p.id === id && p.color === color && p.size === size
    );
    if (cartItem.quantity < 2) {
      return dispatch(open({ status: true, item: item }));
    }
    dispatch(decrQuantity({ id: item.id, color: item.color, size: item.size }));
  };

  const handleIncrItem = (item) => {
    dispatch(incrQuantity({ id: item.id, color: item.color, size: item.size }));
  };

  return (
    <div className="flex justify-between items-center py-2 px-3 bg-[#F8F4EA] rounded-lg my-2">
      <div className="flex gap-4">
        <img src={image} alt="" className="h-24 rounded-md" />
        <div>
          <h3 className="font-semibold text-[14px] capitalize leading-5">
            {name}
          </h3>
          <p>{formattedUnitPrice(price)}</p>
          <span>{color} / </span>
          <span>{size}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => handleDecrItem(data)}>
              <FiMinusCircle className="text-red-500" />
            </button>
            <p>{quantity}</p>
            <button onClick={() => handleIncrItem(data)}>
              <FiPlusCircle className="text-emerald-500" />
            </button>
          </div>
        </div>
      </div>
      <button
        onClick={() =>
          dispatch(
            open({
              status: true,
              item: data,
            })
          )
        }
        className="h-6 w-6"
      >
        <lord-icon
          src="https://cdn.lordicon.com/jmkrnisz.json"
          trigger="hover"
          colors="primary:#ee6d66"
          style={{ width: "24px", height: "24px", cursor: "pointer" }}
        ></lord-icon>
      </button>
    </div>
  );
};

export default CartProductCard;
