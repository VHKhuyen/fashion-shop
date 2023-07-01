import { useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { requestShop } from "../utils/httpRequest";
import useDebounce from "../hooks/useDebounce";
import SearchProductCard from "./Cards/SearchProductCard";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const debounce = useDebounce(searchValue, 500);

  const inputRef = useRef();

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setSearchValue(searchValue);
    }
  };

  useEffect(() => {
    if (!searchValue.trim()) {
      setSearchResult([]);
      return;
    }
    const controller = new AbortController();
    const fetchData = async () => {
      const response = await requestShop.post("/products/search", {
        keySearch: searchValue,
      });
      if (response) {
        setSearchResult(response.data.metadata);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [debounce]);

  return (
    <>
      <div className="dropdown w-full">
        <div tabIndex={0} className="hidden lg:flex input-group justify-end">
          <input
            type="text"
            value={searchValue}
            onChange={handleChange}
            ref={inputRef}
            placeholder="Tìm kiếm"
            className="input w-full bg-gray-100 hover:border-primary transition-colors duration-300 focus:outline-none focus:border-primary h-10"
          />
          <button className="btn btn-primary text-white hover:opacity-80 min-h-6 h-10 leading-10">
            <lord-icon
              target="button"
              src="https://cdn.lordicon.com/xfftupfv.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ height: "25px", width: "25px", color: "red" }}
            ></lord-icon>
          </button>
        </div>
        <div
          tabIndex={0}
          className={`search max-h-[320px] overflow-y-auto
            dropdown-content ${
              !searchValue && "hidden"
            } rounded-md w-full p-2 shadow bg-base-100`}
        >
          {searchResult.length > 0 && searchValue ? (
            searchResult?.map((item) => (
              <div key={item.id}>
                <SearchProductCard {...item} setSearchValue={setSearchValue} />
              </div>
            ))
          ) : (
            <p>Không có kết quả tìm kiếm!</p>
          )}
        </div>
      </div>
      <button className="lg:hidden cursor-pointer hover:text-primary flex items-center gap-1 mr-5 color-change">
        <HiOutlineSearch className="text-2xl pb-[1px]" />
      </button>
    </>
  );
};

export default Search;
