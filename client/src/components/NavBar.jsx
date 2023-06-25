import { toast } from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";

import { avatar } from "../assets/images";
import { MediumButton, Search } from "../components";
import { Logo } from "./index";
import { authSelector, cartSelector } from "../redux/selector";
import { fetchLogout } from "../redux/authSlice";
import { calculateTotalQty } from "../utils/formatter";
import Cart from "./Cart";

const Navbar = () => {
  const { currentUser } = useSelector(authSelector);
  const { cartItems } = useSelector(cartSelector);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToggle = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  const handleLogout = async () => {
    try {
      const toastId = toast.loading("Waiting...");
      const response = await dispatch(fetchLogout(currentUser.user_id));
      toast.remove(toastId);
      if (response.payload.metadata) {
        setTimeout(() => {
          navigate("/");
        });
      } else {
        toast.error("Something wrong!");
      }
    } catch (error) {
      toast.remove();
    }
  };

  const navItems = (
    <>
      <li onClick={handleToggle}>
        <Link to="/products" className="flex items-center p-3  gap-1">
          <lord-icon
            target="a"
            src="https://cdn.lordicon.com/hyhnpiza.json"
            trigger="hover"
            style={{ height: "20px", width: "20px" }}
          ></lord-icon>
          Bộ sưu tập
        </Link>
      </li>
      <li onClick={handleToggle}>
        <Link to="/stores" className="flex items-center p-3  gap-1">
          <lord-icon
            target="a"
            src="https://cdn.lordicon.com/osuxyevn.json"
            trigger="hover"
            style={{ height: "20px", width: "20px" }}
          ></lord-icon>
          Cửa hàng
        </Link>
      </li>
      <li onClick={handleToggle}>
        <Link to="/contact" className="flex items-center p-3  gap-1">
          <lord-icon
            target="a"
            src="https://cdn.lordicon.com/hpivxauj.json"
            trigger="hover"
            style={{ height: "20px", width: "20px" }}
          ></lord-icon>
          Liên hệ
        </Link>
      </li>
    </>
  );

  return (
    <section className="fixed px-4 left-0 right-0 top-0 z-10 bg-[#fff]">
      <div className="navbar px-0 mx-auto max-w-[1240px]">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-square btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-7 h-7 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Logo className="hidden lg:flex" />
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
        </div>
        <div className="navbar-center lg:hidden">
          <Logo className=" lg:hidden" />
        </div>
        <div className="navbar-end">
          <Search />
          <div className="dropdown dropdown-end dropdown-hover min-w-fit">
            <Link
              to="/cart"
              tabIndex={0}
              className="hidden lg:flex hover:text-primary items-center gap-1 mx-4 py-2"
            >
              <div className="indicator">
                <span className="indicator-item badge badge-primary text-xs font-semibold px-[6px]">
                  {calculateTotalQty(cartItems)}
                </span>
                <lord-icon
                  target="a"
                  src="https://cdn.lordicon.com/hyhnpiza.json"
                  trigger="hover"
                  class="set-color"
                  style={{ height: "25px", width: "25px" }}
                ></lord-icon>
              </div>
              <span className="ml-1">Giỏ hàng</span>
            </Link>
            <div
              tabIndex={0}
              className="dropdown-content p-4 shadow bg-base-100 rounded-box"
            >
              <Cart />
            </div>
          </div>
          <Link to="/cart" className="mr-5 lg:hidden block">
            <div className="indicator">
              <span className="indicator-item text-xs font-semibold badge badge-primary px-[6px]">
                {calculateTotalQty(cartItems)}
              </span>
              <BsCart2 className="text-2xl pb-[1px]" />
            </div>
          </Link>

          {/* SIGN IN */}
          {!currentUser ? (
            <>
              <Link to="/login" className="mr-2  block sm:hidden">
                <FiLogIn className="text-xl text-colorRed" />
              </Link>
              <Link to="/login" className="min-w-fit sm:block hidden">
                <MediumButton>Đăng nhập</MediumButton>
              </Link>
            </>
          ) : (
            <>
              <div className="dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-9 rounded-full">
                    <img src={avatar} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-2 p-2 shadow bg-[#DDF7E3] rounded-xl  w-52"
                >
                  <div className="flex px-4 py-2">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img src={avatar} />
                      </div>
                    </div>
                    <h3 className="card-title ml-3 font-bold textGradient">
                      {currentUser.name}
                    </h3>
                  </div>
                  <li className="hover-bordered">
                    <Link
                      to="/profile"
                      onClick={handleToggle}
                      className=" flex items-center gap-1"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="hover-bordered">
                    <Link
                      to="/wish-list"
                      onClick={handleToggle}
                      className="flex items-center gap-1"
                    >
                      <lord-icon
                        target="a"
                        src="https://cdn.lordicon.com/pnhskdva.json"
                        trigger="hover"
                        class="set-color"
                        style={{ height: "20px", width: "20px" }}
                      ></lord-icon>
                      <span>Yêu thích</span>
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary mt-4 w-full hover:opacity-80 text-white normal-case"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
