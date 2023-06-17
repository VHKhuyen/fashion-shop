import { FeaturesCard } from "../../components";

const features = [
  {
    name: "Miễn phí vận chuyển",
    image: "https://cdn.lordicon.com/iejknaed.json",
    description: "Miễn phí vận chuyển cho đơn hàng trên 200k.",
  },
  {
    name: "Đổi trả trong 60 ngày",
    image: "https://cdn.lordicon.com/pimvysaa.json",
    description: "Đổi trả trong vòng 60 ngày với bất kỳ lý do nào",
  },
  {
    name: "Hoàn tiền",
    image: "https://cdn.lordicon.com/nrzqxhfu.json",
    description: "Hoàn tiền trong vòng 24 giờ.",
  },
  {
    name: "Hỗ trợ 24/7",
    image: "https://cdn.lordicon.com/cllunfud.json",
    description:
      "Mua sắm và nhận hỗ trợ từ đội ngũ của chúng tôi bất cứ lúc nào",
  },
];
const Features = () => {
  return (
    <section>
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:p-12 md:p-6 p-0 lg:mt-0 md:mt-0 mt-3">
        {features.map((item, index) => (
          <FeaturesCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Features;
