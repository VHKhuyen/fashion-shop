const { Ok } = require("../core/success.response");
const CheckoutService = require("../services/checkout.service");

class CheckoutController {
  async checkoutReview(req, res, next) {
    new Ok({
      message: "checkout review success!",
      metadata: await CheckoutService.checkoutReview(req.body),
    }).send(res);
  }
}

module.exports = new CheckoutController();
