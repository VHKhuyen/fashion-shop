import { Outlet } from "react-router-dom";
import { Navbar, Footer, ScrollToHead } from "../components";
import { ScrollToTop } from "../components";
import { Toaster } from "react-hot-toast";
import { ModalConfirm } from "../components";
const Main = () => {
  return (
    <section className="mx-auto max-w-[1264px] px-4">
      <Toaster containerClassName="mx-auto max-w-[1264px]" />
      <ModalConfirm />
      <Navbar />
      <div className="pt-20">
        <Outlet />
      </div>
      <ScrollToTop />
      <ScrollToHead />
      <Footer />
    </section>
  );
};

export default Main;
