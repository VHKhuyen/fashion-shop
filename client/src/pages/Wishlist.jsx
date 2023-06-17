import { useTitle } from "../hooks";
import { SectionHeader } from "../components";
import { NoItemsFound } from "../components";

const WishList = () => {
  useTitle("Danh sách yêu thích");
  return (
    <>
      <SectionHeader></SectionHeader>
      <NoItemsFound where={"Danh sách yêu thích"} />
    </>
  );
};

export default WishList;
