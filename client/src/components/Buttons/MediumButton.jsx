const MediumButton = ({ children, btnSpecially }) => {
  return (
    <button
      className={` btn btn-primary  hover:opacity-80 text-white btn-md capitalize  h-10 min-h-[2.5rem] rounded-md  transition duration-300 ${btnSpecially}`}
    >
      {children}
    </button>
  );
};

export default MediumButton;
