import { HeroCarousel, NewArrivalSlider } from "../../components";

const Hero = () => {
  return (
    <section className="flex lg:flex-row flex-col w-full gap-8">
      <div className="lg:w-2/3">
        <HeroCarousel />
      </div>
      <NewArrivalSlider />
    </section>
  );
};

export default Hero;
