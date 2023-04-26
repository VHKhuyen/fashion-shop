import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { avatar } from "../assets/images";
import { MediumButton } from "../components";
import { Logo } from "./index";
import { authSelector, cartSelector } from "../redux/selector";
import { fetchLogout } from "../redux/authSlice";
import { toast } from "react-hot-toast";
import { HiOutlineSearch } from "react-icons/hi";

function Navbar() {
  const { currentUser } = useSelector(authSelector);
  const { cartItems } = useSelector(cartSelector);

  const calculateTotalQty = (products) => {
    let totalQty = 0;
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      totalQty += product.quantity;
    }
    return totalQty;
  };
  const totalQty = calculateTotalQty(cartItems);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };
  const navItems = (
    <>
      <li onClick={handleClick}>
        <Link to="/products" className="flex items-center p-3  gap-1">
          <lord-icon
            target="a"
            src="https://cdn.lordicon.com/hyhnpiza.json"
            trigger="hover"
            style={{ height: "20px", width: "20px" }}
          ></lord-icon>
          Collections
        </Link>
      </li>
      <li onClick={handleClick}>
        <Link to="/stores" className="flex items-center p-3  gap-1">
          <lord-icon
            target="a"
            src="https://cdn.lordicon.com/osuxyevn.json"
            trigger="hover"
            style={{ height: "20px", width: "20px" }}
          ></lord-icon>
          Store Location
        </Link>
      </li>
      <li onClick={handleClick}>
        <Link to="/contact" className="flex items-center p-3  gap-1">
          <lord-icon
            target="a"
            src="https://cdn.lordicon.com/hpivxauj.json"
            trigger="hover"
            style={{ height: "20px", width: "20px" }}
          ></lord-icon>
          Contact
        </Link>
      </li>
    </>
  );

  const handleLogout = async () => {
    try {
      const toastId = toast.loading("Waiting...");
      const result = await dispatch(fetchLogout());
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
    } catch (error) {
      toast.remove();
    }
  };

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
          <div className="hidden lg:flex input-group justify-end">
            <input
              type="text"
              placeholder="Search"
              className="input bg-gray-100 hover:border-primary transition-colors duration-300 focus:outline-none focus:border-primary h-10"
            />
            <button className="btn btn-primary text-white hover:opacity-80 min-h-6 h-10 leading-10">
              <lord-icon
                target="button"
                src="https://cdn.lordicon.com/xfftupfv.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ height: "25px", width: "25px", color: "red" }}
              ></lord-icon>
            </button>
          </div>
          <button
            // onClick={() => setModalOpen(true)}
            className="lg:hidden cursor-pointer hover:text-primary flex items-center gap-1 mr-5 color-change"
          >
            <HiOutlineSearch className="text-2xl pb-[1px]" />
          </button>
          <Link
            to="/cart"
            className="hidden lg:flex hover:text-primary  items-center gap-1 mx-4  min-w-fit color-change"
          >
            <div className="indicator">
              <span className="indicator-item badge badge-primary px-[6px]">
                {totalQty}
              </span>
              <lord-icon
                target="a"
                src="https://cdn.lordicon.com/hyhnpiza.json"
                trigger="hover"
                class="set-color"
                style={{ height: "25px", width: "25px" }}
              ></lord-icon>
            </div>
            <span className="ml-1">Your Cart</span>
          </Link>
          <Link to="/cart" className="mr-5 lg:hidden  block">
            <div className="indicator">
              <span className="indicator-item badge badge-primary px-[6px]">
                {totalQty}
              </span>
              <BsCart2 className="text-2xl pb-[1px]" />
            </div>
          </Link>

          {/* SIGN IN */}
          {!currentUser ? (
            <>
              <Link to="/login" className="mr-2 lg:hidden md:hidden block">
                <FiLogIn className="text-xl text-colorRed" />
              </Link>
              <Link to="/login" className="min-w-fit lg:block md:block hidden">
                <MediumButton>Sign In</MediumButton>
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
                    <Link to="/profile" className=" flex items-center gap-1">
                      Profile
                    </Link>
                  </li>
                  <li className="hover-bordered">
                    <Link to="/wish-list" className="flex items-center gap-1">
                      <lord-icon
                        target="a"
                        src="https://cdn.lordicon.com/pnhskdva.json"
                        trigger="hover"
                        class="set-color"
                        style={{ height: "20px", width: "20px" }}
                      ></lord-icon>
                      <span>WishList</span>
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary mt-4 w-full hover:opacity-80 text-white normal-case"
                    >
                      Logout
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
}

export default Navbar;
