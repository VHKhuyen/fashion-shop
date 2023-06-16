const { Category } = require("../models");

class CategoryController {
  async getAllCategory(req, res) {
    const categories = await Category.findAll();
    new Ok({
      message: "get list category success!",
      metadata: categories,
    }).send(res);
  }
}

module.exports = new CategoryController();
