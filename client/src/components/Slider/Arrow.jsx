export const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`text-gray-700 before:content-['→'] before:text-slate-700 before:text-[25px]  transform-none hover:scale-[1.15] z-[1] right-2 transition-transform 
      ${className}`}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};

export const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`before:content-['←'] before:text-slate-700  before:text-[25px] transform-none hover:scale-[1.25] z-[1] left-1 transition-transform ${className} `}
      style={{ ...style }}
      onClick={onClick}
    />
  );
};
