import { Link } from "react-router-dom";
import { PrimaryButton } from "./index";

const NoItemsFound = ({ where }) => {
  return (
    <div className="mt-24 flex flex-col items-center">
      <div className="text-xl mb-10">
        Bạn không có mặt hàng nào trong {where}!
      </div>
      <Link
        to="/products"
        className="text-[#E96479] font-bold flex items-center gap-2 text-lg"
      >
        <PrimaryButton>Mua ngay</PrimaryButton>
      </Link>
    </div>
  );
};

export default NoItemsFound;
