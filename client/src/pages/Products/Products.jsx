import { useState } from "react";
import { ProductCard } from "../../components";
import { useTitle } from "../../hooks";

const Products = () => {
  useTitle("Products");

  const products = [];
  const [selectedProduct, setSelectedProduct] = useState(products);
  const [selectedBtn, setSelectedBtn] = useState(99);

  const handleProduct = (category, index) => {
    setSelectedBtn(index);
    if (category === "all") {
      setSelectedProduct(products);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const sortProducts = products.filter((p) => p.category === category);
      setSelectedProduct(sortProducts);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const allCategory = [...new Set(products?.map((p) => p.category))];

  return (
    <div className="flex lg:flex-row flex-col gap-5">
      <div className="lg:w-[25%]">
        <aside
          className="rounded-lg bg-white sticky lg:top-20 top-16 py-4 px-2 lg:mx-0 md:mx-0 -mx-4 shadow-lg"
          style={{ zIndex: "2" }}
        >
          <ul className="flex lg:flex-col flex-row lg:overflow-hidden overflow-scroll gap-1">
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-base font-medium">
                Loại sản phẩm
              </div>
              <div className="collapse-content">
                <button className="btn btn-outline hover:bg-white hover:text-primary hover:border-primary btn-sm mr-2 mb-2 normal-case">
                  Áo polo nam Jenta
                </button>
                <button className="btn btn-outline hover:bg-white hover:text-primary hover:border-primary btn-sm mr-2 mb-2 normal-case">
                  Áo polo thể thao nam
                </button>
              </div>
            </div>
            <div className="collapse collapse-arrow">
              <input type="checkbox" />
              <div className="collapse-title text-base font-medium">
                Kích thước
              </div>
              <div className="collapse-content">
                <button className="btn btn-outline hover:bg-white hover:text-primary hover:border-primary btn-sm mr-2 mb-2 normal-case">
                  S
                </button>
                <button className="btn btn-outline hover:bg-white hover:text-primary hover:border-primary btn-sm mr-2 mb-2 normal-case">
                  M
                </button>
                <button className="btn btn-outline hover:bg-white hover:text-primary hover:border-primary btn-sm mr-2 mb-2 normal-case">
                  L
                </button>
                <button className="btn btn-outline hover:bg-white hover:text-primary hover:border-primary btn-sm mr-2 mb-2 normal-case">
                  XL
                </button>
              </div>
            </div>
            <div className="collapse collapse-arrow ">
              <input type="checkbox" />
              <div className="collapse-title text-base font-medium">
                Khoảng giá (VNĐ)
              </div>
              <div className="collapse-content">
                <label className="cursor-pointer label justify-normal">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text hover:text-primary pl-3">
                    Nhỏ hơn 100.000đ
                  </span>
                </label>
                <label className="cursor-pointer label justify-normal">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text hover:text-primary pl-3">
                    Từ 100.000đ - 200.000đ
                  </span>
                </label>
                <label className="cursor-pointer label justify-normal">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text hover:text-primary pl-3">
                    Từ 200.000đ - 350.000đ
                  </span>
                </label>
                <label className="cursor-pointer label justify-normal">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                  />
                  <span className="label-text hover:text-primary pl-3">
                    Từ 350.000đ - 500.000đ
                  </span>
                </label>
              </div>
            </div>

            {allCategory.map((category, index) => (
              <button
                key={index}
                onClick={() => handleProduct(category, index)}
                className={`btn capitalize ${
                  selectedBtn !== index ? "btn-ghost" : "text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </ul>
        </aside>
      </div>
      <section className="lg:w-[75%]">
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-5">
          {selectedProduct?.map((item, index) => (
            <ProductCard key={index} data={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
