import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { AddToCartButton, ProductCard, Subscribe } from "../../components";
import { useTitle } from "../../hooks";
import ProductReview from "./ProductReview";

const ProductDetail = () => {
  useTitle("Product");
  const { data: product } = useLoaderData();
  const { name, description, images, unit_price, category } = product;

  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(1);
  const [added, setAdded] = useState(false);
  const [storedWl, setStoredWl] = useState(false);

  const [size, setSize] = useState(1);
  const sizes = ["S", "M", "L", "XL", "2XL"];
  const [color, setColor] = useState(1);

  const handleAddToCart = () => {};
  const handleAddOne = () => {};
  const handleRemoveOne = () => {};
  const handleAddToWl = () => {};
  const handleGoCart = () => {
    navigate("/cart");
  };

  return (
    <div>
      <section className="flex lg:flex-row flex-col gap-12">
        {/* Product Image */}
        <div
          className="lg:w-1/2 flex justify-center rounded-xl"
          style={{ backgroundColor: "#eceff1", maxHeight: "600px" }}
        >
          <img
            src={images[0].imgUrl}
            alt=""
            className="w-auto object-cover rounded-xl"
            style={{ maxHeight: "600px" }}
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 pt-4">
          <h1 className="text-3xl font-bold">{name}</h1>
          <h3 className="text-4xl mt-6"> {unit_price}đ</h3>

          <div className="flex flex-col mt-8 gap-8">
            {/* PICK A SIZE */}
            <div>
              <h2 className="text-md mb-2 textGradient font-bold">
                Pick a Size
              </h2>
              <div className="flex gap-3">
                {sizes.map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => setSize(index + 1)}
                      className={`hover:shadow-xl h-10 w-10 rounded-full flex items-center justify-center cursor-pointer ${
                        size === index + 1
                          ? "bg-secondary text-white"
                          : "bg-[#E1EEDD]"
                      }`}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* CHOOSE COLORS */}
            <div>
              <h2 className="text-md mb-2 textGradient font-bold">
                Choose Color
              </h2>
              <div className="flex gap-3">
                <span
                  onClick={() => setColor(1)}
                  className={`h-8 w-8 bg-primary rounded-full border-[3px] cursor-pointer ${
                    color === 1 && "border-[#F7C04A]"
                  }`}
                ></span>
                <span
                  onClick={() => setColor(2)}
                  className={`h-8 w-8 bg-[#222] rounded-full border-[3px] cursor-pointer ${
                    color === 2 && "border-[#F7C04A]"
                  }`}
                ></span>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          {!added ? (
            <div className="flex items-center gap-4 mt-10">
              <AddToCartButton handleAddToCart={handleAddToCart} />
              <span
                data-tip={
                  !storedWl ? "add to wishlist" : "remove from wishlist"
                }
                onClick={handleAddToWl}
                className="bg-white p-[10px] rounded-md flex justify-center items-center cursor-pointer tooltip tooltip-success"
              >
                <lord-icon
                  target="span"
                  src={
                    !storedWl
                      ? "https://cdn.lordicon.com/pnhskdva.json"
                      : "https://cdn.lordicon.com/xryjrepg.json"
                  }
                  trigger="hover"
                  colors="primary:#ee6d66"
                  style={{ width: "30px", height: "30px" }}
                ></lord-icon>
              </span>
            </div>
          ) : (
            <div className="flex items-center lg:gap-12 gap-6 mt-10">
              {/* Add More Button */}
              <div className="flex items-center gap-3">
                <button
                  className="btn lg:btn-md btn-sm rounded-sm btn-error text-white"
                  disabled={quantity <= 1}
                  onClick={handleRemoveOne}
                >
                  <IoMdRemove />
                </button>
                <h4>{quantity}</h4>
                <button
                  className="btn lg:btn-md btn-sm rounded-sm text-white border-none"
                  style={{ backgroundColor: "#16c79e" }}
                  onClick={handleAddOne}
                >
                  <IoMdAdd />
                </button>
              </div>
              <button
                onClick={handleGoCart}
                className="btn lg:btn-md btn-sm lg:btn-wide lg:px-0 px-4 normal-case text-white lg:rounded-md rounded-sm"
              >
                <lord-icon
                  target="button"
                  src="https://cdn.lordicon.com/medpcfcy.json"
                  trigger="hover"
                  colors="primary:#fff"
                  style={{ width: "25px", height: "25px" }}
                ></lord-icon>
                &nbsp; Go to Cart
              </button>
            </div>
          )}

          {/* Tabs */}
          <div className="mt-10 tabs">
            <span
              onClick={() => setSelectedTab(1)}
              className={`tab tab-bordered ${
                selectedTab === 1 && "tab-active text-error font-bold"
              }`}
            >
              Description
            </span>
            <span
              onClick={() => setSelectedTab(2)}
              className={`tab tab-bordered ${
                selectedTab === 2 && "tab-active text-error font-bold"
              }`}
            >
              Specification
            </span>
            <span
              onClick={() => setSelectedTab(3)}
              className={`tab tab-bordered ${
                selectedTab === 3 && "tab-active text-error font-bold"
              }`}
            >
              Review (3)
            </span>
          </div>

          {/* Detail and Description */}
          <div className="mt-6">
            {/* Product Description */}
            {selectedTab === 1 && <p className="text-justify">{description}</p>}

            {/* Product Specification */}
            {selectedTab === 2 && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Seller</th>
                      <th>Hello</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Size</td>
                      <td>40</td>
                    </tr>
                    <tr>
                      <td>Color</td>
                      <td>Black</td>
                    </tr>
                    <tr>
                      <td>Category</td>
                      <td>{category.name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Product Review */}
            {selectedTab === 3 && <ProductReview />}
          </div>
        </div>
      </section>

      {/* SIMILAR PRODUCTS */}
      {/* <section className="my-32">
        <h2 className="text-2xl font-bold textGradient mb-8">
          Similar Products
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
          {products
            ?.filter((p) => p.category === category)
            .slice(0, 4)
            .map((item, index) => (
              <ProductCard key={index} data={item} />
            ))}
        </div>
      </section> */}

      {/* GET COUPON */}
      <Subscribe />
    </div>
  );
};

export default ProductDetail;
