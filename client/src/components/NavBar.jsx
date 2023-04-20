import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { avatar } from "../assets/images";
import { MediumButton } from "../components";
import { Logo } from "./index";
import { authSelector } from "../redux/selector";
import { fetchLogout } from "../redux/authSlice";
import { toast } from "react-hot-toast";

function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);
  const { currentUser } = useSelector(authSelector);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navItems = (
    <>
      <li>
        <Link to="/products" className="flex items-center gap-1">
          <lord-icon
            target="a"
            src="https://cdn.lordicon.com/hyhnpiza.json"
            trigger="hover"
            style={{ height: "20px", width: "20px" }}
          ></lord-icon>
          Collections
        </Link>
      </li>
      <li>
        <Link to="/stores" className="flex items-center gap-1">
          <lord-icon
            target="a"
            src="https://cdn.lordicon.com/osuxyevn.json"
            trigger="hover"
            style={{ height: "20px", width: "20px" }}
          ></lord-icon>
          Store Location
        </Link>
      </li>
      <li>
        <Link to="/contact" className="flex items-center gap-1">
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
      console.log(result);
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
            <label tabIndex={0} className="btn pl-0 btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Logo />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>
        <div className="navbar-end">
          <button
            // onClick={() => setModalOpen(true)}
            className="cursor-pointer hover:text-primary flex items-center gap-1 mr-5 color-change"
          >
            <lord-icon
              target="button"
              src="https://cdn.lordicon.com/xfftupfv.json"
              trigger="hover"
              class="set-color"
              style={{ height: "20px", width: "20px" }}
            ></lord-icon>
            <span className="lg:block md:block hidden">Search</span>
          </button>
          {!currentUser && (
            <Link
              to="/wish-list"
              className="hover:text-primary flex items-center gap-1 mr-5 color-change"
            >
              <lord-icon
                target="a"
                src="https://cdn.lordicon.com/pnhskdva.json"
                trigger="hover"
                class="set-color"
                style={{ height: "20px", width: "20px" }}
              ></lord-icon>
              <span className="lg:block md:block hidden">WishList</span>
            </Link>
          )}

          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="mr-5 lg:hidden md:hidden block"
          >
            <BsCart2 className="text-xl pb-[1px] text-error" />
          </button>

          {/* SIGN IN */}
          {!currentUser ? (
            <>
              <Link to="/login" className="mr-2 lg:hidden md:hidden block">
                <FiLogIn className="text-xl text-colorRed" />
              </Link>
              <Link to="/login" className="ml-2 lg:block md:block hidden">
                <MediumButton>Sign In</MediumButton>
              </Link>
            </>
          ) : (
            <>
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full">
                    <img src={avatar} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content -ml-40 mt-2 p-2 shadow bg-[#DDF7E3] rounded-lg text-base-content w-52"
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
                  <li>
                    <Link to="/profile" className=" flex items-center gap-1">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className=" flex items-center gap-1">
                      <lord-icon
                        target="a"
                        src="https://cdn.lordicon.com/hyhnpiza.json"
                        trigger="hover"
                        style={{ height: "20px", width: "20px" }}
                      ></lord-icon>
                      My Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/wish-list" className=" flex items-center gap-1">
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
                      className="btn btn-primary mt-4 w-full text-white normal-case hover:btn-error hover:text-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
          {/* <div className="navbar bg-base-100">
            <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <input
                  type="text"
                  placeholder="Search"
                  className="input input-bordered"
                />
              </div>
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <a className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </a>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

export default Navbar;
