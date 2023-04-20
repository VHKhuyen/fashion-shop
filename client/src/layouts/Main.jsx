import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";
import { ScrollToTop } from "../components";

const Main = () => {
  return (
    <section className="mx-auto max-w-[1264px] px-4">
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
      <ScrollToTop />
      <Footer />
    </section>
  );
};

export default Main;
