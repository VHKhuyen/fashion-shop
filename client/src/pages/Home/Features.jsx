import { FeaturesCard } from "../../components";

const features = [
  {
    name: "Free Delivery",
    image: "https://cdn.lordicon.com/iejknaed.json",
    description: "Free shipping for orders over 200k.",
  },
  {
    name: "60 Days Return",
    image: "https://cdn.lordicon.com/pimvysaa.json",
    description: "60 days return for any reason",
  },
  {
    name: "Refund Payment",
    image: "https://cdn.lordicon.com/nrzqxhfu.json",
    description: "Refund within 24 hours.",
  },
  {
    name: "24/7 Support",
    image: "https://cdn.lordicon.com/cllunfud.json",
    description: "Shop and get support from our team anytime",
  },
];

const Features = () => {
  return (
    <section>
      <div className="grid lg:grid-cols-4 grid-cols-2 lg:p-12 md:p-6 p-0 lg:mt-0 md:mt-0 mt-3">
        {features.map((item, index) => (
          <FeaturesCard key={index} data={item} />
        ))}
      </div>
    </section>
  );
};

export default Features;
