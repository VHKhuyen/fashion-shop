import { useTitle } from "../../hooks";
import Hero from "./Hero";
import Features from "./Features";
import Promotions from "./Promotions";
import HotDeals from "./HotDeals";
import Popular from "./Popular";
import { Subscribe } from "../../components";

const Home = () => {
  useTitle("Home");
  return (
    <>
      <Hero />
      <Features />
      <HotDeals />
      <Popular />
      <Promotions />
      <Subscribe />
    </>
  );
};

export default Home;
