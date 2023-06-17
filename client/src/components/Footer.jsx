import React from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { Logo } from "../components";

const Footer = () => {
  const navItems1 = [
    { name: "Sản phẩm", path: "/products" },
    { name: "Địa điểm cửa hàng", path: "/stores" },
    { name: "Liên hệ", path: "/contact" },
    { name: "Đăng nhập", path: "/login" },
    { name: "Đăng ký", path: "/register" },
  ];
  const navItems2 = [
    { name: "Chính sách bảo mật", path: "/" },
    { name: "Việc làm", path: "/" },
    { name: "Điều khoản và điều kiện", path: "/" },
  ];

  const NavItem = ({ item }) => {
    return (
      <li>
        <Link to={item.path} className="hover:underline">
          {item.name}
        </Link>
      </li>
    );
  };

  const Nav = ({ items, title }) => {
    return (
      <div>
        <h2 className="mb-2 font-bold">{title}</h2>
        <ul className="flex flex-col gap-[6px] text-sm">
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <NavItem item={item} />
            </React.Fragment>
          ))}
        </ul>
      </div>
    );
  };
  return (
    <footer className="mt-16">
      <section className="flex flex-wrap justify-between mb-4 pt-12">
        <div className="">
          <Logo />
          <h2 className="uppercase mt-3 text-sm">ĐĂNG KÝ NHẬN THÔNG TIN</h2>
          <div className="mt-2 lg:mx-0 md:mx-0 mx-2 flex">
            <input
              type="text"
              placeholder="Email Address"
              className="input input-bordered lg:w-[270px] md:w-[270px] w-[200px] -mr-3 focus:outline-none"
            />
            <button className="btn btn-primary text-white normal-case rounded-r-md rounded-l-none flex items-center gap-1">
              <span className="lg:block md:block hidden">Đăng ký</span>
              <lord-icon
                target="button"
                src="https://cdn.lordicon.com/zmkotitn.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: "20px", height: "20px", paddingTop: "2px" }}
              ></lord-icon>
            </button>
          </div>
        </div>
        <Nav items={navItems1} title={"Về Jenta"} />
        <Nav items={navItems2} title={"Hỗ trợ khách hàng"} />
        <div className="text-sm">
          <h2 className="mb-2 font-bold">Liên hệ</h2>
          <span className="flex items-center gap-2 mb-[5px]">
            <HiOutlineMail /> jentashop@gmail.com
          </span>
          <span className="flex items-center gap-2 mb-[5px]">
            <HiOutlinePhone /> +99012345
          </span>
        </div>
      </section>
      <hr />
      <section className="py-5 flex justify-between">
        <div className="lg:text-md md:text-sm text-xs">
          All rights reserved to Jenta &copy; {new Date().getFullYear()}
        </div>
        <div className="flex items-center gap-5 lg:text-xl md:text-lg text-md">
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            <BsFacebook className="text-[#4267B2] hover:scale-125 transition duration-300" />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            <BsInstagram className="text-[#E1306C] hover:scale-125 transition duration-300" />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            <BsTwitter className="text-[#1DA1F2] hover:scale-125 transition duration-300" />
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
