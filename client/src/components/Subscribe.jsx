const Subscribe = () => {
  return (
    <section className="lg:m-10 md:m-8 m-4 lg:px-12 md:px-12 py-8 bg-slate-800 rounded-xl">
      <div className="flex lg:flex-row md:flex-row flex-col lg:gap-4 items-center">
        <div className="lg:w-1/3">
          <lord-icon
            target="section"
            src="https://cdn.lordicon.com/qzwudxpy.json"
            trigger="hover"
            colors="outline:#121331,primary:#ebe6ef,secondary:#d1fad7,tertiary:#f4a09c"
            style={{ width: "300px", height: "300px" }}
          ></lord-icon>
        </div>
        <div className="lg:w-2/3 lg:text-left md:text-left text-center">
          <h1 className="lg:text-5xl text-3xl font-bold text-white">
            Mã giảm giá <span className="text-[#FFDB89]">20%</span>
            <br />
          </h1>
          <h2 className="lg:text-[24px] text-[18px] text-white mt-4">
            Đăng ký nhận thông báo mỗi khi có khuyến mãi
          </h2>
          <div className="mt-10 lg:mx-0 md:mx-0 mx-2 flex justify-center md:justify-start">
            <input
              type="text"
              placeholder="Địa chỉ email"
              className="input input-bordered lg:w-[270px] md:w-[270px] w-[200px] -mr-3"
            />
            <button className="btn btn-primary text-white normal-case rounded-r-md rounded-l-none flex items-center gap-1">
              <span>Đăng ký</span>
              <lord-icon
                target="button"
                src="https://cdn.lordicon.com/zmkotitn.json"
                trigger="hover"
                colors="primary:#ffffff"
                style={{ width: "20px", height: "20px", paddingTop: "2px" }}
              ></lord-icon>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subscribe;
