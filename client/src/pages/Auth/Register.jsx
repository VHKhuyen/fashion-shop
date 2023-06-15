import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import GoogleLogin from "./GoogleLogin";
import { fetchRegister } from "../../redux/authSlice";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Waiting...");
    const result = await dispatch(fetchRegister(formData));
    toast.remove(toastId);
    if (result.payload?.success) {
      toast.success("Register successfully!", {
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
    <section className="w-full flex items-center justify-center">
      <div
        className="flex flex-row-reverse rounded-lg bg-white shadow-lg h-[450px] w-[700px]"
        data-aos="flip-right"
      >
        <div className="lg:w-1/2 p-8">
          <h2 className="text-xl font-bold text-center mb-4">
            Open New Account
          </h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Your Name"
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
              placeholder="Password"
              className="input input-bordered w-full my-2"
              name="password"
              onChange={handleInputChange}
              required
            />
            <button className="btn btn-primary bg-primary hover:opacity-80 border-none w-full text-white normal-case mt-4">
              Register
            </button>
          </form>

          <GoogleLogin />

          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-secondary">
              Login Here
            </Link>
          </p>
        </div>
        <div className="lg:w-1/2 bg-[#B5D5C5] rounded-l-lg flex items-center justify-center lg:flex md:flex ">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.png"
            alt=""
            className="w-[80%]"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;
