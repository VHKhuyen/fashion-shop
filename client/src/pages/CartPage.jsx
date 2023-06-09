import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartSelector } from "../redux/selector";
import { useTitle } from "../hooks";
import { SectionHeader, NoItemsFound, PrimaryButton } from "../components";
import { formattedUnitPrice, calculateTotalPrice } from "../utils/formatter";
import { decrQuantity, incrQuantity } from "../redux/cartSlice";
import { open } from "../redux/modalConfirmSlice";

const Cart = () => {
  useTitle("Giỏ hàng");

  const { cartItems } = useSelector(cartSelector);
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
    <>
      <SectionHeader>Giỏ hàng</SectionHeader>
      {cartItems.length > 0 ? (
        <div className="  flex flex-col xl:flex-row gap-4">
          <div className="overflow-x-auto rounded-lg sticky w-full xl:w-4/6 bg-white">
            <table className="table w-full">
              <thead className="hidden md:table-header-group">
                <tr className="text-lg">
                  <th>Sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center">
                        <Link
                          className="w-20 h-28 flex items-center justify-center"
                          to={`/products/${item.alias}`}
                        >
                          <img
                            className="rounded-[4px] w-full h-full "
                            src={item.image}
                            alt="Avatar"
                          />
                        </Link>
                        <div className="ml-3">
                          <Link
                            className="whitespace-break-spaces font-semibold hover:text-primary transition capitalize text-sm sm:text-base"
                            to={`/products/${item.alias}`}
                          >
                            {item.name}
                          </Link>
                          <div className="text-sm  sm:mt-5">
                            <p>Size: {item.size}</p>
                            <p>Color: {item.color}</p>
                            <p className="md:hidden">
                              {formattedUnitPrice(item.price)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="hidden md:table-cell">
                      <h2 className="font-medium">
                        {formattedUnitPrice(item.price)}
                      </h2>
                    </td>
                    <td className="hidden sm:table-cell">
                      <div className="btn-group items-center gap-3">
                        <button
                          onClick={() => handleDecrItem(item)}
                          className="btn btn-outline w-9 btn-sm "
                        >
                          -
                        </button>
                        <h1>{item.quantity}</h1>
                        <button
                          onClick={() => handleIncrItem(item)}
                          className="btn btn-outline w-9 btn-sm "
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-center">
                        <button
                          onClick={() =>
                            dispatch(
                              open({
                                status: true,
                                item: item,
                              })
                            )
                          }
                          className="h-6 w-6"
                        >
                          <lord-icon
                            src="https://cdn.lordicon.com/jmkrnisz.json"
                            trigger="hover"
                            colors="primary:#ee6d66"
                            style={{
                              width: "24px",
                              height: "24px",
                              cursor: "pointer",
                            }}
                          ></lord-icon>
                        </button>
                        <div className="sm:hidden btn-group items-center gap-1">
                          <button
                            onClick={() => handleDecrItem(item)}
                            className="btn btn-outline w-5 btn-sm "
                          >
                            -
                          </button>
                          <h1>{item.quantity}</h1>
                          <button
                            onClick={() => handleIncrItem(item)}
                            className="btn btn-outline w-5 btn-sm "
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="relative h-max w-full z-[2] xl:w-2/6 px-6 py-12 bg-white rounded-xl shadow-md">
            <p className="absolute text-sm py-1 px-5 top-0 left-0 right-0 rounded-t p-1 bg-primary opacity-90 text-white">
              Dùng mã giảm giá của Jenta trong bước tiếp theo
            </p>
            <div className="flex justify-between items-end">
              <span className="text-base font-semibold">
                Tổng đơn hàng (Tạm tính) :{" "}
              </span>
              <h2 className="text-xl font-semibold">
                {formattedUnitPrice(calculateTotalPrice(cartItems))}
              </h2>
            </div>
            <Link to="/checkout">
              <PrimaryButton className="w-full mt-12">Thanh toán</PrimaryButton>
            </Link>
          </div>
        </div>
      ) : (
        <NoItemsFound where={"Giỏ hàng"} />
      )}
    </>
  );
};

export default Cart;
