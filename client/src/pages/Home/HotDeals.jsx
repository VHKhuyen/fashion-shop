import { useEffect, useState } from "react";
import { ListProductSlider } from "../../components";
import { SeeMore } from "../../components";
import { requestShop } from "../../utils/httpRequest";

const HotDeals = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await requestShop.get("/products");
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
      <SeeMore to="/products" />
    </section>
  );
};

export default HotDeals;
