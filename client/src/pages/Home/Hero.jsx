import { HeroSlider, NewArrivalSlider } from "../../components";

const Hero = () => {
  return (
    <section className="flex lg:flex-row justify-start flex-col max-w-full gap-6">
      <div className="lg:w-2/3">
        <HeroSlider />
      </div>
      <div className="lg:max-w-[32%] lg:h-[480px]">
        <div className="mb-3">
          <span className="bg-gradient text-white text-xs px-6 py-[5px] rounded-full">
            Hàng Mới Về
          </span>
        </div>
        <NewArrivalSlider />
      </div>
    </section>
  );
};

export default Hero;
