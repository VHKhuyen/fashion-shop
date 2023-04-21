import { SeeMore } from "../../components";
import { ListProductSlider } from "../../components";
import { products } from "../../data";

const Popular = () => {
  return (
    <section>
      <div className="mb-8">
        <div className="flex items-center">
          <lord-icon
            src="https://cdn.lordicon.com/xhbsnkyp.json"
            trigger="loop"
            colors="outline:#545454,primary:#c7166f,secondary:#fad1e6"
            style={{ width: "60px", height: "60px" }}
          ></lord-icon>
          <h2 className="font-bold text-2xl textGradient">Popular Items</h2>
        </div>
      </div>
      <ListProductSlider products={products} />
      <SeeMore to="/products" />
    </section>
  );
};

export default Popular;
