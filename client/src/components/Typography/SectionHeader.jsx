const SectionHeader = ({ children }) => {
  return (
    <h1 className="text-center lg:text-3xl md:text-2xl text-xl font-bold pt-5 mb-10">
      <span className="textGradient">{children}</span>
    </h1>
  );
};

export default SectionHeader;
