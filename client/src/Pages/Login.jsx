import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin } from "../redux/authSlide";
import { authSelector } from "../redux/selector";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector(authSelector);
  const {} = auth;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const toastId = toast.loading("Waiting...");
      const result = await dispatch(fetchLogin(inputs));
      toast.remove(toastId);
      if (result.payload?.success) {
        localStorage.setItem("user", JSON.stringify(result.payload.other));
        toast.success(`${result.payload?.message}`, {
          onClose: setTimeout(() => {
            navigate("/");
          }, 2 * 1000),
        });
      } else if (result.payload?.success == false) {
        toast.error(`${result.payload?.message}`);
      } else {
        toast.error("Something wrong!");
      }
    } catch (error) {
      toast.remove();
    }
  };
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Get started today!</h1>
        <p className="mt-4 text-gray-500">Sign in to your account</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 mb-0 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter username"
              name="username"
              onChange={handleChange}
            />

            <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
              placeholder="Enter password"
              name="password"
              onChange={handleChange}
            />
            <span className="absolute inset-y-0 right-0 grid place-content-center px-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-center text-sm text-gray-500">
            Don't you have an account?
            <Link className="underline text-primary" to="/register">
              Sign up
            </Link>
          </p>

          <Toaster
            toastOptions={{
              duration: 2000,
            }}
          />

          <button
            type="submit"
            className="inline-block rounded-lg  bg-primary w-[120px] px-5 py-3 text-sm font-medium text-white hover:bg-primary_hover"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
