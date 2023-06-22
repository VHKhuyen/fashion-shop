import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTitle } from "../hooks";
import { FcMoneyTransfer } from "react-icons/fc";
import { BsQrCodeScan } from "react-icons/bs";
import { CartProductCard } from "../components";
import { useSelector } from "react-redux";
import { cartSelector } from "../redux/selector";
import { formattedUnitPrice, calculateTotalPrice } from "../utils/formatter";
import { momo_icon, vnpay } from "../assets/images";

const Checkout = () => {
  useTitle("Thanh toán đơn hàng");

  const { cartItems } = useSelector(cartSelector);
  const [btnDisable, setBtnDisable] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    city: "",
    state: "",
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handlePlaceOrder = () => {
    navigate("/success");
    addToPurchased(cart);
    deleteShoppingCart();
  };

  return (
    <section className="flex flex-col">
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="lg:w-[30%]">
          <h2 className="text-xl font-bold my-4">Thông tin giao hàng</h2>
          <form>
            <input
              type="text"
              placeholder="Họ và tên"
              className="input input-bordered mb-2 mt-1 w-full"
              name="name"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              className="input input-bordered mb-2 mt-1 w-full"
              name="phone"
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              placeholder="Địa chỉ (ví dụ: 103 Vạn Phúc, phường Vạn Phúc)"
              className="input input-bordered w-full mb-2 mt-1"
              name="address"
              onChange={handleInputChange}
              required
            />
            <select className="select select-bordered mb-2 mt-1 w-full">
              <option disabled>Tỉnh thành</option>
              <option>Hà Nội</option>
              <option>Bắc Ninh</option>
            </select>
            <select className="select select-bordered mb-2 mt-1 w-full">
              <option disabled>Quận huyện</option>
              <option>Cầu giấy</option>
              <option>Ba đình</option>
            </select>
            <select className="select select-bordered mb-2 mt-1 w-full">
              <option disabled>Phường xã</option>
              <option>Cầu giấy</option>
              <option>Ba đình</option>
            </select>
            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Ghi chú (tùy chọn)"
            ></textarea>
          </form>
        </div>
        <div className="lg:w-[30%]">
          <h2 className="text-xl font-bold my-4">Thanh toán</h2>
          <div className=" bg-white rounded-lg shadow-sm border-t-[6px] border-primary p-4">
            <div className="form-control mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-primary"
                  defaultChecked={true}
                />
                <FcMoneyTransfer className="text-2xl float-right" />
                <span className="label-text">
                  Thanh toán khi nhận hàng (COD)
                </span>
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-primary"
                />
                <img src={vnpay} className="w-12" />
                <span className="label-text">Thanh toán qua ví VNPAY</span>
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-primary"
                />
                <img src={momo_icon} className="w-6" />
                <span className="label-text">Thanh toán qua Ví MoMo</span>
              </label>
            </div>

            <div className="form-control mt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-primary"
                />
                <BsQrCodeScan className=" text-2xl" />
                <span className="label-text">
                  Chuyển khoản liên ngân hàng bằng QR Code
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="lg:w-[40%]">
          <div className="sticky">
            <h2 className="text-xl font-bold my-4">Đơn hàng</h2>
            <div className="p-5 bg-white rounded-lg shadow-sm border-t-[6px] border-primary">
              <h2>({cartItems.length}) Sản phẩm</h2>
              <hr className="my-2" />
              <div className="cart max-h-[160px] overflow-y-auto">
                {cartItems?.length ? (
                  cartItems.map((item, index) => (
                    <CartProductCard data={item} key={index} />
                  ))
                ) : (
                  <h2 className="flex gap-1">
                    Chưa có sản phẩm trong hóa đơn!
                    <Link
                      to="/products"
                      className="text-colorGreen flex items-center gap-1"
                    >
                      Mua ngay{"  "}
                      <lord-icon
                        target="a"
                        src="https://cdn.lordicon.com/zmkotitn.json"
                        trigger="hover"
                        colors="primary:#ec7272"
                        style={{ width: "20px", height: "20px" }}
                      ></lord-icon>
                    </Link>
                  </h2>
                )}
              </div>
              <div className="form-control my-4">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="input input-bordered flex-1"
                  />
                  <button className="btn btn-primary text-white hover:opacity-80">
                    Áp dụng
                  </button>
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between">
                <h2>Tạm tính</h2>
                <h2 className="font-bold">
                  {formattedUnitPrice(calculateTotalPrice(cartItems))}
                </h2>
              </div>
              <div className="flex justify-between">
                <h2>Giảm giá</h2>
                <h2 className="font-bold">{formattedUnitPrice(0)}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Phí giao hàng</h2>
                <h2 className="font-bold">+{formattedUnitPrice(25000)}</h2>
              </div>
              <div className="flex justify-between">
                <h2>Tổng cộng</h2>
                <h2 className="font-bold">
                  {formattedUnitPrice(calculateTotalPrice(cartItems) + 25000)}
                </h2>
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={cartItems?.length === 0 || btnDisable}
                className="mt-8 btn btn-primary w-full normal-case text-white"
              >
                Đặt hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
