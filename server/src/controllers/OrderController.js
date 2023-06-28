const { Order, OrderItem, Product } = require("../models");
const { NotFoundError } = require("../core/error.response");
const { Ok } = require("../core/success.response");

class OrderController {
  async createOrder(req, res) {
    const {
      user_id,
      name,
      phone,
      address,
      district,
      city,
      state,
      country,
      note,
      total,
      orderItems,
    } = req.body;

    const newOrder = await Order.create({
      user_id,
      name,
      phone,
      address,
      district,
      city,
      state,
      country,
      note,
      total,
    });

    for (const orderItem of orderItems) {
      await OrderItem.create({
        order_id: newOrder.order_id,
        product_id: orderItem.id,
        quantity: orderItem.quantity,
      });
    }

    new Ok({
      message: "Create order successfully!",
      metadata: newOrder,
    }).send(res);
  }

  async getOrderById(req, res) {
    const orderId = req.params.id;

    const order = await Order.findOne({
      where: {
        order_id: orderId,
      },
    });

    if (!order) {
      throw new NotFoundError("Not found order!");
    }
    const orderItems = await OrderItem.findAll({
      where: {
        order_id: orderId,
      },
      include: [
        {
          model: Product,
        },
      ],
    });

    new Ok({
      message: "get order successfully!",
      metadata: { order, orderItems },
    }).send(res);
  }
}

module.exports = new OrderController();
