const { Cart, Order, OrderItem, OrderPayment } = require("../models");

class CheckoutService {
  static checkoutReview = async ({ cartId, discounts, item_products = [] }) => {
    const cart = await Cart.findOne({
      where: {
        cart_id: cartId,
      },
    });
    if (!cart) throw new BadRequestError("Cart dose not exits!");

    const checkout_order = {
      totalPrice: 0,
      feeShip: 0,
      totalDiscount: 0,
      totalCheckout: 0,
    };

    //tong tien don hang
    const checkoutPrice = item_products.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);

    //tong tien don hang truoc khi xy ly
    checkout_order.totalPrice += checkoutPrice;
    checkout_order.totalCheckout += checkoutPrice;
    return checkout_order;
  };

  static orderByUser = async ({
    cartId,
    userId,
    discounts,
    item_products = [],
    user_address = {},
    user_payment = {},
  }) => {
    const checkout_order = await CheckoutService.checkoutReview({
      cartId,
      discounts,
      item_products,
    });
    const newOrder = {};
  };
}

module.exports = CheckoutService;
