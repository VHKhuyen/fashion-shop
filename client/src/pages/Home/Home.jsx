import { useTitle } from "../../hooks";
import Hero from "./Hero";
import Features from "./Features";
import Promotions from "./Promotions";
import HotDeals from "./HotDeals";
import Popular from "./Popular";

const Home = () => {
  useTitle("Home");
  return (
    <>
      <Hero />
      <Features />
      <Popular />
      <HotDeals />
      <Promotions />
    </>
  );
};

export default Home;
