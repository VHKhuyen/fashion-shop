const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  transform-none hover:scale-[1.25] z-[1] right-0 transition-transform`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className}  transform-none hover:scale-[1.25] z-[1] left-0 transition-transform`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
export { NextArrow, PrevArrow };
