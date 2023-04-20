import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import { AddToCartButton, ProductCard, Subscribe } from "../../components";
import { useTitle } from "../../hooks";
import ProductReview from "./ProductReview";

const product = {
  id: "b4d83415-d20a-4bba-8629-22b2780b6e93",
  category: "Men's Boot",
  name: "TERRET FREE HIKER COLD.RDY HIKING BOOTS",
  seller: "Adidas",
  price: 169,
  stock: 17,
  ratings: 5,
  ratingsCount: 2833,
  img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2ded0bee28b249bbb19cad5000818b77_9366/Terrex_Free_Hiker_COLD.RDY_Hiking_Boots_Black_FZ3364_01_standard.jpg",
  shipping: 10,
  quantity: 0,
};

const products = [
  {
    id: "b4d83415-d20a-4bba-8629-22b2780b6e93",
    category: "Men's Boot",
    name: "TERREX FREE HIKER COLD.RDY HIKING BOOTS",
    seller: "Addidas",
    price: 169,
    stock: 17,
    ratings: 5,
    ratingsCount: 2833,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2ded0bee28b249bbb19cad5000818b77_9366/Terrex_Free_Hiker_COLD.RDY_Hiking_Boots_Black_FZ3364_01_standard.jpg",
    shipping: 10,
    quantity: 0,
  },
  {
    id: "1d54fd83-83df-42f8-ae2b-f5ef9d4987ea",
    category: "Men's Sneaker",
    name: "MOVE FEELREADY SPORT TEE",
    seller: "Addidas",
    price: 14,
    stock: 19,
    ratings: 3,
    ratingsCount: 4041,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ec81fbd781fe4aa3a8cead230019c192_9366/AEROREADY_Designed_2_Move_Feelready_Sport_Tee_Burgundy_H30268_21_model.jpg",
    shipping: 5,
    quantity: 0,
  },
  {
    id: "1ce97e0e-3611-4406-8788-7b413640f59e",
    category: "Men's Sneaker",
    name: "ADIDAS CAMO BOX GRAPHIC TEE",
    seller: "Addidas",
    price: 16,
    stock: 10,
    ratings: 3,
    ratingsCount: 4505,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/809d5f06a7c74e93aef3ad08017c415a_9366/adidas_Camo_Box_Graphic_Tee_Grey_HB4828_21_model.jpg",
    shipping: 11,
    quantity: 0,
  },
  {
    id: "f088beb8-d664-4166-99f8-6995c2f08465",
    category: "Men's Sneaker",
    name: "ADICOLOR CLASSICS TREFOIL TEE",
    seller: "Addidas",
    price: 20,
    stock: 12,
    ratings: 4,
    ratingsCount: 41,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/de7b5dc9e5a341b9bf5aad570106ba06_9366/Adicolor_Classics_Trefoil_Tee_Burgundy_H06641_21_model.jpg",
    shipping: 38,
    quantity: 0,
  },
];

const ProductDetail = () => {
  useTitle("Product");
  const { id, name, img, seller, price, category } = product;
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(1);
  const [added, setAdded] = useState(false);
  const [storedWl, setStoredWl] = useState(false);

  const [size, setSize] = useState(1);
  const sizes = ["M", "L", "XL", "2XL"];
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
            src={img}
            alt=""
            className="w-auto object-cover rounded-xl"
            style={{ maxHeight: "600px" }}
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-1/2 pt-4">
          <span className="text-error">{seller}</span>
          <h1 className="text-3xl font-bold">{name}</h1>
          <h2 className="text-4xl mt-6">BDT {price * 10}</h2>

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
            {selectedTab === 1 && (
              <p className="text-justify">
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour.
              </p>
            )}

            {/* Product Specification */}
            {selectedTab === 2 && (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Seller</th>
                      <th>{seller}</th>
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
                      <td>{category}</td>
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
      <section className="my-32">
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
      </section>

      {/* GET COUPON */}
      <Subscribe />
    </div>
  );
};

export default ProductDetail;
