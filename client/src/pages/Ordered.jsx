import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useTitle } from "../hooks";
import { requestShop } from "../utils/httpRequest";
import { formattedUnitPrice } from "../utils/formatter";

const Ordered = () => {
  useTitle("Đơn hàng");
  const { id } = useParams();
  const [orderInfo, setOrderInfo] = useState({});
  const [orderItems, setOrderItems] = useState([]);
  const {
    name,
    phone,
    address,
    ward,
    district,
    province,
    note,
    order_status,
    payment,
    totalPrice,
  } = orderInfo;

  useEffect(() => {
    const fetchOrdered = async () => {
      try {
        const response = await requestShop.get(`/order/${id}`);
        if (response.data.metadata) {
          setOrderInfo(response.data.metadata.order);
          setOrderItems(response.data.metadata.orderItems);
        } else {
          toast.error("Có lỗi xảy ra khi xử lý. Vui lòng thử lại");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdered();
  }, []);
  return (
    <section>
      <div className="flex items-center justify-center">
        <lord-icon
          target="section"
          src="https://cdn.lordicon.com/yqzmiobz.json"
          trigger="hover"
          colors="primary:#16c79e"
          style={{ width: "100px", height: "100px" }}
        ></lord-icon>
        <h1 className="font-bold text-2xl mt-4">Cảm ơn bạn đã đặt hàng</h1>
      </div>

      <div className="flex justify-center mt-6">
        <ul className="steps lg:w-3/4">
          <li className="step step-primary">Đơn hàng đang xử lý</li>
          <li className="step">Xác nhận đặt hàng</li>
          <li className="step">Đang giao</li>
          <li className="step">Giao hàng thành công</li>
        </ul>
      </div>

      <div className="mt-8 bg-white rounded-lg p-8 shadow-lg grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 lg:w-[80%] mx-auto relative">
        <div>
          <h2 className="mb-3">
            <b>Tên</b> : {name}
          </h2>
          <h2 className="mb-3">
            <b>Địa chỉ</b> : {`${address}, ${ward}, ${district}, ${province}`}
          </h2>
          <h2 className="mb-3">
            <b>Số điện thoại</b> : {phone}
          </h2>
        </div>
        <span className="h-[70%] w-[1px] bg-[#bbb] absolute left-[48%] top-[15%] lg:block md:block hidden"></span>
        <div>
          <h2 className="font-bold">Đơn hàng</h2>
          {orderItems?.map((item, index) => (
            <div className="my-2" key={index}>
              <div className="flex items-center">
                <Link
                  className="w-20 h-28 flex items-center justify-center"
                  to={`/products/${item.product.alias}`}
                >
                  <img
                    className="rounded-[4px] w-full h-full "
                    src={item.product.featured_image}
                    alt="Avatar Tailwind CSS Component"
                  />
                </Link>
                <div className="ml-3">
                  <Link
                    className="whitespace-break-spaces font-semibold hover:text-primary transition capitalize text-sm sm:text-base"
                    to={`/products/${item.alias}`}
                  >
                    {item.product.name}
                  </Link>
                  <div className="text-sm  sm:mt-5">
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                    <p>{formattedUnitPrice(item.product.price)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <hr className="my-4" />
          <h2 className="font-bold">
            Tổng cộng : {formattedUnitPrice(totalPrice)}
          </h2>
          <b>
            <p className="">Phương thức thanh toán</p>
          </b>
          <p className="">Thanh toán khi nhận hàng (COD)</p>
        </div>
      </div>
    </section>
  );
};

export default Ordered;
