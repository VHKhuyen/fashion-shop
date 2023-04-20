const AddToCartButton = ({ handleAddToCart }) => {
  return (
    <button
      onClick={handleAddToCart}
      className="btn btn-primary hover:opacity-80 hover:text-white rounded-md normal-case text-white btn-wide"
    >
      <lord-icon
        target="button"
        src="https://cdn.lordicon.com/hyhnpiza.json"
        trigger="hover"
        colors="primary:#ffffff"
        style={{ width: "25px", height: "25px" }}
      ></lord-icon>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
