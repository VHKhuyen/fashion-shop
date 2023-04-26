import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartSelector } from "../redux/selector";
import { useTitle } from "../hooks";
import { SectionHeader, NoItemsFound } from "../components";
import { formattedUnitPrice } from "../utils/formatter";
import { removeItem, decrQuantity, incrQuantity } from "../redux/cartSlice";

const Cart = () => {
  useTitle("Your Cart");

  const [modelRemoveItem, setModelRemoveItem] = useState({
    status: false,
    item: null,
  });
  const { cartItems } = useSelector(cartSelector);
  const dispatch = useDispatch();

  const calculateTotalPrice = (products) => {
    let totalPrice = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      totalPrice += product.quantity * product.price;
    }
    return totalPrice;
  };
  const totalPrice = calculateTotalPrice(cartItems);

  const handleDecrItem = (item) => {
    const { id, color, size } = item;
    const cartItem = cartItems.find(
      (p) => p.id === id && p.color === color && p.size === size
    );
    if (cartItem.quantity < 2) {
      return setModelRemoveItem({ status: true, item: item });
    }
    dispatch(decrQuantity({ id: item.id, color: item.color, size: item.size }));
  };

  const handleIncrItem = (item) => {
    dispatch(incrQuantity({ id: item.id, color: item.color, size: item.size }));
  };

  const handleCheckout = (item) => {};

  return (
    <>
      <SectionHeader>Your Cart</SectionHeader>

      <div
        className={`modal ${
          modelRemoveItem.status && "visible opacity-100 pointer-events-auto"
        }`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete this product?
          </h3>
          <p className="py-4">{modelRemoveItem.item?.name}</p>
          <div className="modal-action">
            <button
              onClick={() => {
                dispatch(removeItem(modelRemoveItem.item));
                setModelRemoveItem({
                  ...modelRemoveItem,
                  status: false,
                  item: null,
                });
              }}
              className="btn btn-primary text-white"
            >
              Remove
            </button>
            <button
              onClick={() => {
                setModelRemoveItem({
                  ...modelRemoveItem,
                  status: false,
                  item: null,
                });
              }}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      {cartItems.length > 0 ? (
        <div className="  flex flex-col xl:flex-row gap-4">
          <div
            className="overflow-x-auto rounded-lg sticky w-full xl:w-4/6 bg-white"
            data-aos="fade-up"
          >
            <table className="table w-full">
              <thead className="hidden md:table-header-group">
                <tr className="text-lg">
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center">
                        <Link
                          className="w-20 h-28 flex items-center justify-center"
                          to={`/products/${item.id}`}
                        >
                          <img
                            className="rounded-[4px] w-full h-full "
                            src={item.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </Link>
                        <div className="ml-3">
                          <Link
                            className="whitespace-break-spaces font-semibold hover:text-primary transition capitalize text-sm sm:text-base"
                            to={`/products/${item.id}`}
                          >
                            {item.name}
                          </Link>
                          <div className="text-sm  sm:mt-5">
                            <p>Size:{item.size}</p>
                            <p>Colors: {item.color}</p>
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
                            setModelRemoveItem({
                              ...modelRemoveItem,
                              status: true,
                              item: item,
                            })
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
          <div
            className="h-max w-full sticky top-16 z-[2] xl:w-2/6 p-10 bg-white rounded-xl shadow-md"
            data-aos="fade-up"
          >
            <div className="flex justify-between items-end">
              <span className="text-xl">Subtotal</span>
              <h2 className="text-xl font-semibold">
                {formattedUnitPrice(totalPrice)}
              </h2>
            </div>
            <button
              onClick={handleCheckout}
              className="btn btn-primary hover:opacity-80 w-full mt-12 text-white "
            >
              Checkout &emsp;
              <lord-icon
                target="button"
                src="https://cdn.lordicon.com/zmkotitn.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: "20px", height: "20px" }}
              ></lord-icon>
            </button>
          </div>
        </div>
      ) : (
        <NoItemsFound where={"Cart"} />
      )}
    </>
  );
};

export default Cart;
