const order = [
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
];
export const formattedSize = (variants) => {
  const uniqueSizes = variants.reduce((acc, curr) => {
    if (!acc.includes(curr.size)) {
      acc.push(curr.size);
    }
    return acc;
  }, []);

  const handleSizes = (a, b) => {
    return order.indexOf(a) - order.indexOf(b);
  };
  return uniqueSizes.filter((size) => order.includes(size)).sort(handleSizes);
};

export const formattedUnitPrice = (price) => {
  return price?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};

export const calculateTotalPrice = (products) => {
  let totalPrice = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    totalPrice += product.quantity * product.price;
  }
  return totalPrice;
};

export const calculateTotalQty = (products) => {
  let totalQty = 0;
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    totalQty += product.quantity;
  }
  return totalQty;
};
