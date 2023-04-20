import { Link } from "react-router-dom";
import "../../assets/styles/style.css";
import { PrimaryButton } from "../index";

const PromotionCard = ({ data }) => {
  const { name, off, bg, id, seller } = data;

  return (
    <div
      className="promotion-card"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div className="promotion-card-content gradientBg">
        <p className="promotion-card-title">{seller}</p>
        <h3 className="promotion-card-heading">{name}</h3>
        <h1 className="promotion-card-subheading">
          Last call for upto <span className="promotion-card-off">{off}%</span>{" "}
          off!
        </h1>
        <Link to={`/products/${id}`}>
          <PrimaryButton className="promotion-card-button">
            Buy Now
          </PrimaryButton>
        </Link>
      </div>
    </div>
  );
};

export default PromotionCard;
