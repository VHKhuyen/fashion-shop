import { ListProductSlider } from "../../components";
import { SeeMore } from "../../components";

const hotDeals = [
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
  {
    id: "26dd7da8-c854-4bab-aaf5-32cc964da2ec",
    category: "Men's Sneaker",
    name: "LNY TREFOIL FILL TEE",
    seller: "Addidas",
    price: 16,
    stock: 17,
    ratings: 4,
    ratingsCount: 4985,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c53945c38b614702ba6fae1d0164b2f1_9366/LNY_Trefoil_Fill_Tee_Black_HR9040_21_model.jpg",
    shipping: 35,
    quantity: 0,
  },
  {
    id: "a2615943-7eeb-4d6a-ab1b-78fb51ce39da",
    category: "Men's Sneaker",
    name: "CREATOR 365 TEE",
    seller: "Addidas",
    price: 34,
    stock: 20,
    ratings: 3,
    ratingsCount: 4727,
    img: "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/8c3f5445517340e8bc02ad8100ffd3f6_9366/Runner_Tee_Burgundy_H25050_21_model.jpg",
    shipping: 2,
    quantity: 0,
  },
];

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
      <ListProductSlider products={hotDeals} />
      <SeeMore to="/product" />
    </section>
  );
};

export default HotDeals;
