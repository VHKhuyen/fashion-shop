import { useState, useEffect } from "react";
import { useTitle } from "../hooks";
import { requestShop } from "../utils/httpRequest";
import { Loading } from "../components";

const StoreLocation = () => {
  useTitle("Stores");
  const [selectedTab, setSelectedTab] = useState(1);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storeData = await requestShop.get("/stores");
        setStores(storeData.data.metadata);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="flex lg:gap-16 gap-8 lg:flex-row flex-col">
      {stores.length ? (
        <>
          <div className="lg:w-1/3">
            <div className="sticky top-20 bg-white py-8 px-4 rounded-xl shadow-lg">
              <h1 className="text-xl font-bold mb-5 pl-8">Vị trí cửa hàng</h1>
              <div className="flex lg:flex-col lg:gap-10 lg:flex-no-wrap flex-row flex-wrap gap-1 text-[#bbb]">
                {stores.length ? (
                  stores.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedTab(index + 1);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`cursor-pointer ${
                        selectedTab === index + 1 && "text-secondary"
                      }`}
                    >
                      <span className="flex lg:items-start md:items-start items-center gap-1">
                        <lord-icon
                          target="span"
                          src="https://cdn.lordicon.com/fihkmkwt.json"
                          trigger="hover"
                          colors={
                            selectedTab === index + 1
                              ? "primary:#16c79e,secondary:#16c79e"
                              : "primary:#bbb,secondary:#bbb"
                          }
                          style={{ width: "30px", height: "30px" }}
                        ></lord-icon>
                        <div>
                          <h2 className="font-bold lg:text-md md:tex-md text-sm">
                            {item.name}
                          </h2>
                          <p className="lg:text-md md:text-sm text-xs lg:block md:block hidden">
                            {item.location}
                          </p>
                        </div>
                      </span>
                    </div>
                  ))
                ) : (
                  <Loading />
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-2/3">
            {stores?.map(
              (item, index) =>
                selectedTab === index + 1 && (
                  <div key={index}>
                    <div>
                      <img
                        src={item.img}
                        alt=""
                        className="h-[300px] w-[500px] object-cover"
                      />
                      <h1 className="mt-6 text-3xl font-bold">{item.name}</h1>
                      <p className="mt-2">{item.location}</p>
                    </div>
                    <div>
                      <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 lg:gap-5 md:gap-4 gap-2">
                        <div className="p-5 rounded-lg bg-white hover:shadow-lg flex flex-col gap-2">
                          <lord-icon
                            target="div"
                            src="https://cdn.lordicon.com/slduhdil.json"
                            trigger="hover"
                            colors="primary:#16c79e"
                            style={{ width: "35px", height: "35px" }}
                          ></lord-icon>
                          {item.location}
                        </div>
                        <div className="p-5 rounded-lg bg-white hover:shadow-lg flex flex-col gap-2">
                          <lord-icon
                            target="div"
                            src="https://cdn.lordicon.com/tftaqjwp.json"
                            trigger="hover"
                            colors="primary:#16c79e"
                            style={{ width: "35px", height: "35px" }}
                          ></lord-icon>
                          {item.phone}
                        </div>
                        <div className="p-5 rounded-lg bg-white hover:shadow-lg flex flex-col gap-2">
                          <lord-icon
                            target="div"
                            src="https://cdn.lordicon.com/qmuwmmnl.json"
                            trigger="hover"
                            colors="primary:#16c79e"
                            style={{ width: "35px", height: "35px" }}
                          ></lord-icon>
                          {item.duration}
                        </div>
                        <div className="p-5 rounded-lg bg-white hover:shadow-lg flex flex-col gap-2">
                          <lord-icon
                            target="div"
                            src="https://cdn.lordicon.com/qtxqkhzr.json"
                            trigger="hover"
                            colors="primary:#16c79e"
                            style={{ width: "35px", height: "35px" }}
                          ></lord-icon>
                          {item.on_day}
                        </div>
                      </div>

                      <div className="mt-12">
                        <img
                          src={item.map_img}
                          alt=""
                          className="w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default StoreLocation;
