import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../../redux/authSlice";
import { authSelector } from "../../redux/selector";
import toast from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const { loading } = auth;
  const navigate = useNavigate();
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Waiting...");
    const result = await dispatch(fetchLogin(formData));
    toast.remove(toastId);
    if (result.payload?.success) {
      toast.success(`${result.payload?.message}`, {
        onClose: setTimeout(() => {
          navigate("/");
        }, 1.5 * 1000),
      });
    } else if (result.payload?.success == false) {
      toast.error(`${result.payload?.message}`);
    } else {
      toast.error("Something wrong!");
    }
  };
  return (
    <section className=" w-full flex items-center justify-center">
      <div
        className="flex rounded-lg bg-white shadow-lg h-[450px] w-[700px]"
        data-aos="flip-right"
      >
        <div className="lg:w-1/2 p-8">
          <h2 className="text-xl font-bold text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered w-full"
              name="email"
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full my-2"
              name="password"
              onChange={handleInputChange}
              required
            />

            {/* {error && (
              <span className="text-error text-sm flex items-center gap-1">
                <BiError />
                Your Email and Password is incorrect!
              </span>
            )} */}
            <button className="btn btn-primary hover:opacity-80 w-full text-white normal-case mt-4">
              Login
            </button>
          </form>

          <GoogleLogin />

          <p className="mt-10">
            Don't have an account?
            <Link to="/register" className="text-secondary">
              Register Here
            </Link>
          </p>
        </div>
        <div className="lg:w-1/2 bg-[#D6E4E5] rounded-r-lg flex items-center justify-center lg:flex md:flex ">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-page-4468581-3783954.png"
            alt=""
            className="w-[80%]"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
