import { useEffect, useState } from "react";
import { Loading, SeeMore } from "../../components";
import { ListProductSlider } from "../../components";
import { requestShop } from "../../utils/httpRequest";

const Popular = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await requestShop.get("/products/popular");
      setProducts(response.data.metadata);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section>
      <div className="mb-4">
        <div className="flex items-center">
          <lord-icon
            src="https://cdn.lordicon.com/xhbsnkyp.json"
            trigger="loop"
            colors="outline:#545454,primary:#c7166f,secondary:#fad1e6"
            style={{ width: "60px", height: "60px" }}
          ></lord-icon>
          <h2 className="font-bold text-2xl textGradient">Sản phẩm phổ biến</h2>
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

export default Popular;
