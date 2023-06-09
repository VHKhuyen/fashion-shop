import { ReviewCard } from "../../components";

const ProductReview = () => {
  const reviewData = [
    {
      id: 1,
      review: "Sản phẩm tuyệt vời",
      reviewer: "Rahman Selim",
      reviewerPhoto:
        "https://uclic.ucl.ac.uk/thumbs/people/james-hardwick/james-thegem-person-350x350-q100.jpg",
    },
    {
      id: 2,
      review: "Tôi đã mua và sản phẩm thật tuyệt",
      reviewer: "Masha Afroz",
      reviewerPhoto:
        "https://th.bing.com/th/id/OIP.IajO7RtGoQZ-7CD-A572SwHaGu?pid=ImgDet&w=551&h=500&rs=1",
    },
    {
      id: 3,
      review:
        "Tôi rất thích đặt hàng sản phẩm này, tôi đã mua hai lần và rất hài lòng",
      reviewer: "Sheikh Naser Selim",
      reviewerPhoto:
        "https://th.bing.com/th/id/R.ae3b95e4ce25b4c91afe7287b90cf8a8?rik=LsWhxlMYZjgJhg&pid=ImgRaw&r=0",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {reviewData.map((review, index) => (
        <ReviewCard key={index} data={review} />
      ))}
    </div>
  );
};

export default ProductReview;
