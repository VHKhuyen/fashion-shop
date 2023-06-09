import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";
import { fetchRegister } from "../../redux/authSlice";
import { useTitle } from "../../hooks";
import { authSelector } from "../../redux/selector";

const Register = () => {
  useTitle("Đăng ký tài khoản");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(authSelector);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Waiting...");
    const result = await dispatch(fetchRegister(formData));
    toast.remove(toastId);

    if (result.payload?.metadata) {
      toast.success("Đăng ký thành công", {
        onClose: setTimeout(() => {
          navigate("/");
        }, 1.5 * 1000),
      });
    } else if (result.payload?.message) {
      toast.error(`${result.payload?.message}`);
    } else {
      toast.error("Lỗi server!");
    }
  };

  let body;
  if (currentUser) {
    body = <Navigate to="/" />;
  } else {
    body = (
      <section className="w-full flex items-center justify-center">
        <div className="flex flex-row-reverse rounded-lg bg-white shadow-lg h-[450px] md:w-[700px] w-[448px]">
          <div className="md:w-1/2 p-8">
            <h2 className="text-xl font-bold text-center mb-4">Đăng ký</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Tên"
                className="input input-bordered w-full mb-2"
                name="name"
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered w-full"
                name="email"
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="input input-bordered w-full my-2"
                name="password"
                onChange={handleInputChange}
                required
              />
              <button className="btn btn-primary bg-primary hover:opacity-80 border-none w-full text-white normal-case mt-4">
                Đăng ký
              </button>
            </form>

            <GoogleLogin />

            <p className="mt-4">
              Bạn đã có tài khoản?
              <Link to="/login" className="text-secondary">
                Đăng nhập ngay!
              </Link>
            </p>
          </div>
          <div className="md:w-1/2 bg-[#B5D5C5] rounded-l-lg items-center justify-center md:flex hidden">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png"
              alt=""
              className="w-[80%]"
            />
          </div>
        </div>
      </section>
    );
  }
  return <>{body}</>;
};

export default Register;
