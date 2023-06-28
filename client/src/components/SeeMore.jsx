import { Link } from "react-router-dom";

const SeeMore = ({ to }) => {
  return (
    <div className="flex items-center justify-end mt-8">
      <Link to={to} className="cursor-pointer flex items-center gap-2">
        <h2 className="text-[#0081B4] font-bold text-md hover:text-[#344D67]">
          Xem thêm
        </h2>
        <lord-icon
          target="a"
          src="https://cdn.lordicon.com/zmkotitn.json"
          trigger="hover"
          colors="primary:#0081B4"
          style={{ width: "18px", height: "18px" }}
        ></lord-icon>
      </Link>
    </div>
  );
};

export default SeeMore;
