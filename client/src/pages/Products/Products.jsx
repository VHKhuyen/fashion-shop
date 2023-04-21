import axios from "axios";
import { useEffect, useState } from "react";
import { BsFilterSquare } from "react-icons/bs";
import { ProductCard } from "../../components";
import { useTitle } from "../../hooks";
import { priceRanges, sizes } from "../../data";

const Products = () => {
  useTitle("Products");
  const [products, setProducts] = useState([]);
  const tabs = [...new Set(products?.map((p) => p.category.name))];
  const [selectedTab, setSelectedTab] = useState(100);

  const handleTab = (category, index) => {
    setSelectedTab(index);
    if (category === "all") {
      setProducts(products);
    } else {
      const sortProducts = products.filter((p) => p.category.name === category);
      setProducts(sortProducts);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get("http://localhost:8000/api/v1/products");
      setProducts(response.data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex lg:flex-row flex-col gap-5">
      <div className="lg:w-[25%]">
        <aside
          className="hidden rounded-lg lg:block bg-white sticky top-16 py-4 px-2 lg:mx-0 md:mx-0 "
          style={{ zIndex: "2" }}
        >
          <div className="flex flex-wrap px-2">
            <div className="flex items-center gap-2 mr-3 py-2">
              <BsFilterSquare className="text-xl" />
              <span className="font-medium">Filters</span>
            </div>
            <select className="select select-bordered min-h-0 h-9 flex-grow ">
              <option defaultValue>Mặc định</option>
              <option value="Từ A-Z">Từ A-Z</option>
              <option value="Từ Z-A">Từ Z-A</option>
              <option>Rẻ nhất</option>
              <option>Giá giảm dần</option>
              <option>Mới nhất</option>
            </select>
          </div>
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
                {sizes.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className="btn btn-outline hover:bg-white hover:text-primary hover:border-primary btn-sm mr-2 mb-2 normal-case"
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="collapse collapse-arrow ">
              <input type="checkbox" />
              <div className="collapse-title text-base font-medium">
                Khoảng giá (VNĐ)
              </div>
              <div className="collapse-content">
                {priceRanges.map((item, index) => {
                  return (
                    <label
                      key={index}
                      className="cursor-pointer label justify-normal"
                    >
                      <input
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                      <span className="label-text hover:text-primary pl-3">
                        {item}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </ul>
        </aside>
      </div>
      <section className="lg:w-[75%]">
        <div className="tabs tabs-boxed bg-transparent p-0 pb-3">
          <a
            onClick={() => handleTab("all", 100)}
            className={`tab mr-2 ${
              selectedTab == 100 ? "tab-active" : "bg-gray-200"
            }`}
          >
            All
          </a>
          {tabs?.map((category, index) => (
            <a
              key={index}
              onClick={() => handleTab(category, index)}
              className={`tab mr-2  ${
                selectedTab == index ? "tab-active" : "bg-gray-200"
              }`}
            >
              {category}
            </a>
          ))}
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-5">
          {products?.map((item, index) => (
            <ProductCard key={index} data={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products;
