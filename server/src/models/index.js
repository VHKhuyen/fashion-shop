const { User, UserAddress } = require("./user.model");
const { Cart, CartItem } = require("./cart.model");
const { Employee } = require("./employee.model");
const {
  Order,
  OrderItem,
  OrderShipping,
  OrderPayment,
} = require("./order.model");
const {
  Product,
  Category,
  ProductImg,
  ProductVariant,
} = require("./product.model");
const { Store } = require("./store.model");
const { KeyToken } = require("./keyToken.model");
const { ApiKey } = require("./apikey.model");
const { Discount } = require("./discount.model");

KeyToken.belongsTo(User, { foreignKey: "user_id" });

CartItem.belongsTo(Cart, { foreignKey: "cart_id" });
CartItem.belongsTo(Product, { foreignKey: "product_id" });

Cart.belongsTo(User, { foreignKey: "cart_user_id" });
Cart.hasMany(CartItem, { foreignKey: "cart_id" });

OrderItem.belongsTo(Order, { foreignKey: "order_id" });
OrderItem.belongsTo(Product, { foreignKey: "product_id" });

Order.belongsTo(User, { foreignKey: "user_id" });
Order.hasMany(OrderItem, { foreignKey: "order_id", as: "order_items" });

ProductImg.belongsTo(Product, { foreignKey: "product_id" });
Product.hasMany(ProductImg, { foreignKey: "product_id", as: "images" });
Product.hasMany(ProductVariant, {
  foreignKey: "product_id",
  as: "variants",
});
Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

ProductVariant.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});
ProductVariant.belongsTo(ProductImg, {
  foreignKey: "product_id",
  as: "image",
});

module.exports = {
  User,
  UserAddress,
  Employee,
  Order,
  OrderItem,
  OrderShipping,
  OrderPayment,
  Product,
  ProductImg,
  ProductVariant,
  Category,
  Store,
  KeyToken,
  ApiKey,
  Discount,
  Cart,
  CartItem,
};
