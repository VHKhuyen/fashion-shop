import { Link } from "react-router-dom";
import { logo } from "../../assets/images";
const Logo = ({ className }) => {
  return (
    <Link
      to="/"
      className={`text-primary mr-4 lg:text-[24px] text-[20px]  font-bold flex items-center gap-2 transition duration-300 ${className}`}
      style={{ fontFamily: "'Ubuntu', sans-serif" }}
    >
      <img src={logo} alt="" className="lg:h-10 md:h-9 h-8" />
      Jenta
    </Link>
  );
};

export default Logo;
