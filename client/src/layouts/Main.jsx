import { Outlet } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Main = () => {
  return (
    <section className="mx-auto max-w-[1264px] px-4">
      <Navbar />
      <Outlet />
      <Footer />
    </section>
  );
};

export default Main;
