const PrimaryButton = ({ children, eventHandler }) => {
  return (
    <button
      onClick={eventHandler}
      className="btn btn-primary hover:opacity-80 lg:btn-md md:btn-md btn-sm text-white normal-case lg:px-8 md:px-8 px-5 rounded-md border-none"
    >
      {children} &nbsp;
      <lord-icon
        target="button"
        src="https://cdn.lordicon.com/zmkotitn.json"
        trigger="hover"
        colors="primary:#ffffff"
        style={{ width: "20px", height: "20px" }}
      ></lord-icon>
    </button>
  );
};

export default PrimaryButton;
