import { Link } from "react-router-dom";
import { CartProductCard } from "./index";
import { cartImg } from "../assets/images";
import { PrimaryButton } from "./index";
import { useSelector } from "react-redux";
import { cartSelector } from "../redux/selector";
import { formattedUnitPrice, calculateTotalPrice } from "../utils/formatter";
import { useTitle } from "../hooks";

const Cart = () => {
  useTitle("Giỏ hàng");
  const { cartItems } = useSelector(cartSelector);

  return (
    <section className="cart w-[400px] ">
      <div className="cart max-h-[320px] overflow-y-auto ">
        {cartItems?.length ? (
          cartItems?.map((item, index) => (
            <CartProductCard data={item} key={index} />
          ))
        ) : (
          <div className="flex items-center justify-center">
            <img src={cartImg} className=" w-[30%]" alt="" />
          </div>
        )}
      </div>
      {cartItems?.length ? (
        <>
          <div className="flex justify-end mt-8 mb-3">
            <h2 className="text-xl font-semibold">
              <span className="font-normal">Tổng cộng : </span>
              {formattedUnitPrice(calculateTotalPrice(cartItems))}
            </h2>
          </div>
          <Link to="/cart">
            <button className="btn btn-primary normal-case text-white hover:opacity-80 w-full ">
              <lord-icon
                target="button"
                src="https://cdn.lordicon.com/medpcfcy.json"
                trigger="hover"
                class="current-color"
                style={{ width: "25px", height: "25px" }}
              ></lord-icon>
              &nbsp; Đến giỏ hàng
            </button>
          </Link>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <h4 className="my-2 text-xl font-bold text-center">
            Giỏ hàng của bạn trống!
          </h4>
          <Link
            to="/products"
            className="font-bold flex items-center gap-2 text-lg"
          >
            <PrimaryButton>Mua ngay</PrimaryButton>
          </Link>
        </div>
      )}
    </section>
  );
};

export default Cart;
