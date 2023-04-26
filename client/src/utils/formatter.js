export const formattedUnitPrice = (price) => {
  return price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

const order = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"];
export const formattedSize = (variants) => {
  const uniqueSizes = variants.reduce((acc, curr) => {
    if (!acc.includes(curr.size)) {
      acc.push(curr.size);
    }
    return acc;
  }, []);

  const handleSizes = (a, b) => {
    if (typeof a === "string") {
      return order.indexOf(a) - order.indexOf(b);
    } else return;
  };
  return uniqueSizes.filter((size) => order.includes(size)).sort(handleSizes);
};
