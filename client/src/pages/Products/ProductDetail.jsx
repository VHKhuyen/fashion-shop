import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loading, ProductCard } from "../../components";
import { useTitle } from "../../hooks";
import { requestShop } from "../../utils/httpRequest";
import { addItem } from "../../redux/cartSlice";
import ProductReview from "./ProductReview";
import { formattedSize, formattedUnitPrice } from "../../utils/formatter";
import { AddedCard } from "../../components";

const ProductDetail = () => {
  useTitle("Sản phẩm");

  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [sameProducts, setSameProducts] = useState([]);

  const [size, setSize] = useState("");
  const [chooseSize, setChooseSize] = useState("false");
  const [images, setImages] = useState({});

  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState(1);

  const handleChangeImage = (id) => {
    const selectedImage = product.images.find((item) => item.id === id);
    if (selectedImage) {
      setImages(selectedImage);
    }
  };

  const handleAddToCart = () => {
    if (chooseSize === "false") {
      setChooseSize(false);
    } else {
      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: images.src,
          color: images.color,
          size,
          quantity,
        })
      );
      toast.custom(
        (t) => (
          <AddedCard
            {...{
              id: product.id,
              name: product.name,
              image: images.src,
              color: images.color,
              size,
              price: product.price,
              quantity,
            }}
            t={t}
          />
        ),
        {
          duration: 3000,
          position: "top-right",
        }
      );
    }
  };

  const handleQuantity = (e) => {
    e.preventDefault();
    if (e.target.innerText === "-" && quantity > 1) {
      setQuantity((preQuantity) => (preQuantity -= 1));
    } else if (e.target.innerText === "+") {
      setQuantity((preQuantity) => (preQuantity += 1));
    } else return;
  };

  useEffect(() => {
    const fetchProductSame = async (slug) => {
      const response = await requestShop.get("/products/category", {
        params: {
          type: slug,
        },
      });
      setSameProducts(response.data.metadata);
    };

    const fetchProduct = async () => {
      const response = await requestShop.get(`/products/${id}`);
      setProduct(response.data.metadata);
      setImages(response.data.metadata.images[0]);
      fetchProductSame(response.data.metadata.category.slug);
    };
    fetchProduct();
  }, [id]);

  return (
    <div>
      {product ? (
        <section className="flex lg:flex-row flex-col gap-12">
          {/* Product Image */}
          <div className="lg:w-1/2 max-h-[600px] flex justify-center rounded-xl">
            <img
              src={images?.src}
              alt="Image"
              className="w-auto object-cover max-h-[600px] rounded-xl"
            />
          </div>

          {/* Product Details */}
          <div className="lg:w-1/2 pt-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <h3 className="text-4xl mt-6">
              {formattedUnitPrice(product.price)}
            </h3>
            <div className="flex flex-col mt-6 gap-6">
              {/* SIZE */}
              <div>
                <h2 className="text-md mb-2 textGradient font-bold">
                  Kích thước:
                </h2>
                <div
                  className={`inline-block p-2 ${
                    !chooseSize && "rounded-lg border-2 border-error"
                  }`}
                >
                  <ul className="flex gap-3">
                    {formattedSize(product.variants).map((item) => {
                      return (
                        <li
                          key={item}
                          onClick={() => {
                            setSize(item);
                            setChooseSize(true);
                          }}
                          className={`hover:shadow-lg transition h-10 w-10 rounded-full flex items-center justify-center cursor-pointer ${
                            size === item
                              ? "bg-primary text-white"
                              : "bg-[#E1EEDD]"
                          }`}
                        >
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* COLORS */}
              <div>
                <h2 className="text-md mb-2 textGradient font-bold">
                  Màu sắc: {images.color}
                </h2>
                <div className="flex gap-3">
                  {product.images.map((img) => (
                    <div key={img.id} className="avatar">
                      <div
                        onClick={() => handleChangeImage(img.id)}
                        className={`cursor-pointer ${
                          img.id === images.id && "border-primary"
                        } border-[2px]   hover:border-primary w-10 mr-3 rounded`}
                      >
                        <img src={img.src} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex items-center gap-4 mt-10">
              <div className="btn-group items-center gap-3">
                <button
                  onClick={handleQuantity}
                  className="btn btn-outline md:btn-md md:text-2xl md:min-w-[50px] text-xl  btn-sm "
                >
                  -
                </button>
                <h1>{quantity}</h1>
                <button
                  onClick={handleQuantity}
                  className="btn btn-outline md:btn-md md:text-2xl md:min-w-[50px] text-xl btn-sm "
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn btn-primary hover:opacity-80 btn-sm md:btn-md md:w-48 hover:text-white rounded-md normal-case text-white"
              >
                <lord-icon
                  target="button"
                  src="https://cdn.lordicon.com/hyhnpiza.json"
                  trigger="hover"
                  colors="primary:#ffffff"
                  style={{ width: "25px", height: "25px" }}
                ></lord-icon>
                {size ? "Thêm vào giỏ hàng" : "Chọn kích thước"}
              </button>
            </div>

            {/* Tabs */}
            <div className="mt-10 tabs">
              <span
                onClick={() => setSelectedTab(1)}
                className={`tab tab-bordered ${
                  selectedTab === 1 && "tab-active text-error font-bold"
                }`}
              >
                Đặc tính nổi bật
              </span>
              <span
                onClick={() => setSelectedTab(2)}
                className={`tab tab-bordered ${
                  selectedTab === 2 && "tab-active text-error font-bold"
                }`}
              >
                Chi tiết sản phẩm
              </span>
              <span
                onClick={() => setSelectedTab(3)}
                className={`tab tab-bordered ${
                  selectedTab === 3 && "tab-active text-error font-bold"
                }`}
              >
                Đánh giá
              </span>
            </div>

            {/* Detail and Description */}
            <div className="mt-6">
              {/* Product Description */}
              {selectedTab === 1 && (
                <p className="text-justify">{product.description}</p>
              )}

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
                        <td>{product.category.name}</td>
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
      ) : (
        <Loading />
      )}

      {/* SIMILAR PRODUCTS */}
      {sameProducts ? (
        <section className="my-32">
          <h2 className="text-2xl font-bold textGradient mb-8">
            Gợi ý cho bạn
          </h2>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-5">
            {sameProducts.map((item) => (
              <ProductCard key={item.id} data={item} />
            ))}
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default ProductDetail;
