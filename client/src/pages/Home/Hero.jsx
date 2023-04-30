import { HeroCarousel, NewArrivalSlider } from "../../components";

const Hero = () => {
  return (
    <section className="flex lg:flex-row flex-col w-full gap-8">
      <div className="lg:w-2/3">
        <HeroCarousel />
      </div>
      <div className="lg:w-1/3 lg:h-[480px]">
        <div className="mb-3">
          <span className="bg-gradient text-white text-xs px-6 py-[5px] rounded-full">
            New Arrival
          </span>
        </div>
        <NewArrivalSlider />
      </div>
    </section>
  );
};

export default Hero;
