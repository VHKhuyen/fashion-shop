const { Cart, CartItem } = require("../models");
const { BadRequestError } = require("../core/error.response");

class CartService {
  static createUserCart = async ({ userId }) => {
    return await Cart.create({
      cart_user_id: userId,
    });
  };

  static updateUserCartItem = async ({
    userId,
    productVariant = {},
    quantity,
  }) => {
    const cart = await Cart.findOne({
      where: {
        cart_user_id: userId,
      },
    });

    if (cart) {
      const cartItem = await CartItem.findOne({
        where: {
          cart_id: cart.cart_id,
          product_id: productVariant.product_id,
          color: productVariant.color,
          size: productVariant.size,
        },
      });

      if (cartItem) {
        cartItem.quantity += quantity;
        await cartItem.save();
        return cartItem;
      } else {
        const newCartItem = await CartItem.create({
          cart_id: cart.cart_id,
          product_id: productVariant.product_id,
          color: productVariant.color,
          size: productVariant.size,
          quantity: quantity,
        });
        return newCartItem;
      }
    }
  };

  static addToCart = async ({ userId, productVariant = {} }) => {
    let cart = await Cart.findOne({
      where: {
        cart_user_id: userId,
      },
    });

    if (cart) {
      cart.cart_count_product += 1;
      await cart.save();
    } else {
      const newCart = await CartService.createUserCart({ userId });
      cart = newCart;
    }

    return await CartService.updateUserCartItem({
      userId: userId,
      productVariant: productVariant,
      quantity: 1,
    });
  };

  static deleteCartItem = async ({ userId, productVariant = {} }) => {
    const cart = await Cart.findOne({
      where: {
        cart_user_id: userId,
      },
    });
    if (!cart) throw new BadRequestError("Cart dose not exits!");
    cart.cart_count_product -= 1;
    await cart.save();

    await CartItem.destroy({
      where: {
        cart_id: cart.cart_id,
        product_id: productVariant.product_id,
        color: productVariant.color,
        size: productVariant.size,
      },
    });
  };

  static getListCart = async ({ userId }) => {
    const cart = await Cart.findOne({
      where: {
        cart_user_id: userId,
      },
      include: {
        model: CartItem,
      },
    });
    if (!cart) if (!cart) throw new BadRequestError("Cart dose not exits!");
    return cart;
  };
}

module.exports = CartService;
