import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcMoneyTransfer } from "react-icons/fc";
import { BsQrCodeScan } from "react-icons/bs";
import { CartProductCard } from "../components";
import { useTitle } from "../hooks";
import { cartSelector } from "../redux/selector";
import { formattedUnitPrice, calculateTotalPrice } from "../utils/formatter";
import { momo_icon, vnpay } from "../assets/images";
import { requestShop } from "../utils/httpRequest";
import { removeAllItem } from "../redux/cartSlice";
import { toast } from "react-hot-toast";

const Checkout = () => {
  useTitle("Thanh toán đơn hàng");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector(cartSelector);
  const totalPrice = calculateTotalPrice(cartItems);
  const [btnDisable, setBtnDisable] = useState(true);
  const [listProvince, setListProvince] = useState([]);
  const [listDistrict, setListDistrict] = useState([]);
  const [listWard, setListWard] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    ward: "",
    district: "",
    province: "",
    note: "",
    payment: "COD",
    totalPrice,
    orderItems: cartItems,
  });

  const { name, phone, address, ward, district, province } = formData;

  const handleSubmit = async () => {
    try {
      const response = await requestShop.post("/order", formData);
      if (response.data.metadata) {
        dispatch(removeAllItem());
        navigate(`ordered/${response.data.metadata.order_id}`);
      } else {
        toast.error("Có lỗi xảy ra khi xử lý. Vui lòng thử lại");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (e) => {
    let { name, value } = e.target;
    if (name == "province") {
      let province = listProvince.find((item) => (item.code = value));
      value = province.name;
    }
    if (name == "district") {
      let district = listDistrict.find((item) => (item.code = value));
      value = district.name;
    }
    if (name == "ward") {
      let ward = listWard.find((item) => (item.code = value));
      value = ward.name;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWardChange = (code) => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/d/${code}?depth=2`
        );
        setListWard(response.data.wards);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDistricts();
  };

  const handleDistrictChange = (code) => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get(
          `https://provinces.open-api.vn/api/p/${code}?depth=2`
        );
        setListDistrict(response.data.districts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDistricts();
  };

  useEffect(() => {
    if (name && phone && address && ward && district && province) {
      setBtnDisable(false);
    }
  }, [name, phone, address, ward, district, province]);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        setListProvince(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProvinces();
  }, []);

  return (
    <section className="flex flex-col">
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="lg:w-[60%] flex md:flex-row flex-col gap-8">
          <div className="md:w-[50%]">
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
              <select
                name="province"
                onChange={(e) => {
                  handleSelectChange(e);
                  handleDistrictChange(e.target.value);
                }}
                className="select select-bordered mb-2 mt-1 w-full"
              >
                <option value="">Tỉnh thành</option>
                {listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <select
                name="district"
                onChange={(e) => {
                  handleSelectChange(e);
                  handleWardChange(e.target.value);
                }}
                className="select select-bordered mb-2 mt-1 w-full"
              >
                <option value="">Quận huyện</option>
                {listDistrict.length > 0 &&
                  listDistrict.map((item, index) => {
                    return (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <select
                name="ward"
                onChange={handleSelectChange}
                className="select select-bordered mb-2 mt-1 w-full"
              >
                <option value="">Phường xã</option>
                {listWard.length > 0 &&
                  listWard.map((item, index) => {
                    return (
                      <option key={index} value={item.code}>
                        {item.name}
                      </option>
                    );
                  })}
              </select>
              <textarea
                name="note"
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full"
                placeholder="Ghi chú (tùy chọn)"
              ></textarea>
            </form>
          </div>
          <div className="md:w-[50%]">
            <h2 className="text-xl font-bold my-4">Thanh toán</h2>
            <div className=" bg-white rounded-lg shadow-sm border-t-[6px] border-primary p-4">
              <div className="form-control mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment"
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
                    disabled
                    type="radio"
                    name="payment"
                    className="radio checked:bg-primary"
                  />
                  <img src={vnpay} className="w-12" />
                  <span className="label-text">Thanh toán qua ví VNPAY</span>
                </label>
              </div>
              <div className="form-control mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    disabled
                    type="radio"
                    name="payment"
                    className="radio checked:bg-primary"
                  />
                  <img src={momo_icon} className="w-6" />
                  <span className="label-text">Thanh toán qua Ví MoMo</span>
                </label>
              </div>
              <div className="form-control mt-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    disabled
                    type="radio"
                    name="payment"
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
        </div>
        <div className="lg:w-[40%]">
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
              <h2 className="font-bold">{formattedUnitPrice(totalPrice)}</h2>
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
              onClick={handleSubmit}
              disabled={cartItems?.length === 0 || btnDisable}
              className="mt-8 btn btn-primary w-full normal-case text-white"
            >
              Đặt hàng
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
