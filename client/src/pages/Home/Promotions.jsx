import { PromotionSlider } from "../../components";

const Promotions = () => {
  return (
    <section>
      <div className="flex items-center mb-8">
        <lord-icon
          src="https://cdn.lordicon.com/clcopglh.json"
          trigger="loop"
          style={{ width: "60px", height: "60px" }}
        ></lord-icon>
        <h2 className="font-bold text-2xl textGradient">Promotions</h2>
      </div>
      <PromotionSlider />
    </section>
  );
};

export default Promotions;
