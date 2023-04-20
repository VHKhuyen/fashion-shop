import { useTitle } from "../hooks";
import { SectionHeader } from "../components";
import { NoItemsFound } from "../components";

const WishList = () => {
  useTitle("My Wishlist");
  return (
    <>
      <SectionHeader>My Wishlist</SectionHeader>
      <NoItemsFound where={"Wishlist"} />
    </>
  );
};

export default WishList;
