import { useEffect, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
      const response = [1, 2, 3, 4];
      if (response) {
        setSearchResult(response);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [searchValue]);

  return (
    <>
      <div className="dropdown w-full">
        <div tabIndex={0} className="hidden lg:flex input-group justify-end">
          <input
            type="text"
            value={searchValue}
            onChange={handleChange}
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
          className={`
            dropdown-content ${
              !(searchResult.length > 0) && "hidden"
            } rounded-md w-full p-2 shadow bg-base-100`}
        >
          <div className="card-body">
            <p>Không có kết quả tìm kiếm</p>
          </div>
        </div>
      </div>
      <button className="lg:hidden cursor-pointer hover:text-primary flex items-center gap-1 mr-5 color-change">
        <HiOutlineSearch className="text-2xl pb-[1px]" />
      </button>
    </>
  );
};

export default Search;
