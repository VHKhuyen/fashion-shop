import { useEffect, useState } from "react";
import { ListProductSlider, Loading } from "../../components";
import { SeeMore } from "../../components";
import { requestShop } from "../../utils/httpRequest";

const HotDeals = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await requestShop.get("/products/discount");
        setProducts(response.data.metadata);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section>
      <div className="mb-4">
        <div className="flex items-center">
          <lord-icon
            src="https://cdn.lordicon.com/tqywkdcz.json"
            trigger="loop"
            style={{ width: "60px", height: "60px" }}
          ></lord-icon>
          <h2 className="font-bold text-2xl textGradient">
            Khuyến mãi nổi bật
          </h2>
        </div>
      </div>
      {products.length ? (
        <>
          <ListProductSlider products={products} />
          <SeeMore to="/products" />
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default HotDeals;
