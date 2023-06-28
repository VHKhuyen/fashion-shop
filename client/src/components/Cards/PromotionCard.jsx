const PromotionCard = ({ data }) => {
  const { image } = data;

  return (
    <div>
      <img src={image} alt="Image" />
    </div>
  );
};

export default PromotionCard;
