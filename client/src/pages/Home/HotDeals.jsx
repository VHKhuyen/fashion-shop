import { ListProductSlider } from "../../components";
import { SeeMore } from "../../components";
import { products } from "../../data";

const HotDeals = () => {
  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center">
          <lord-icon
            src="https://cdn.lordicon.com/tqywkdcz.json"
            trigger="loop"
            style={{ width: "60px", height: "60px" }}
          ></lord-icon>
          <h2 className="font-bold text-2xl textGradient">Hot Deals</h2>
        </div>
      </div>
      <ListProductSlider products={products} />
      <SeeMore to="/product" />
    </section>
  );
};

export default HotDeals;
