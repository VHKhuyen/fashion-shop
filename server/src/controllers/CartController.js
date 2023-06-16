const { Ok } = require("../core/success.response");
const CartService = require("../services/cart.service");

class CartController {
  async addToCart(req, res, next) {
    new Ok({
      message: "Create new cart success!",
      metadata: await CartService.addToCart(req.body),
    }).send(res);
  }

  async updateCart(req, res, next) {
    new Ok({
      message: "Update cart success!",
      metadata: await CartService.updateUserCartItem(req.body),
    }).send(res);
  }
  async deleteCartItem(req, res, next) {
    new Ok({
      message: "delete cart success!",
      metadata: await CartService.deleteCartItem(req.body),
    }).send(res);
  }
  async getListCart(req, res, next) {
    new Ok({
      message: "delete cart success!",
      metadata: await CartService.getListCart(req.body),
    }).send(res);
  }
}

module.exports = new CartController();
