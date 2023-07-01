const { Sequelize } = require("sequelize");
const { Product, Category, ProductImg, ProductVariant } = require("../models");
const { Ok } = require("../core/success.response");

class ProductController {
  async searchProduct(req, res) {
    const { keySearch } = req.body;
    console.log(req.body);
    const products = await Product.findAll({
      where: Sequelize.literal(`MATCH (name) AGAINST (:keySearch)`),
      replacements: { keySearch },
    });

    new Ok({
      message: "get list product success!",
      metadata: products,
    }).send(res);
  }

  async getAllProduct(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
        {
          model: ProductImg,
          as: "images",
          attributes: ["id", "src", "color"],
        },
        {
          model: ProductVariant,
          as: "variants",
          attributes: ["color", "size", "inventory_quantity"],
        },
      ],
      order: [
        ["images", "id", "asc"],
        ["variants", "id", "ASC"],
      ],
      limit: 20,
    });

    new Ok({
      message: "get list product success!",
      metadata: products,
    }).send(res);
  }

  async getProductNew(req, res) {
    const products = await Product.findAll({
      order: [["createdAt"]],
      limit: 5,
    });
    new Ok({
      message: "get list product success!",
      metadata: products,
    }).send(res);
  }

  async getProductDiscount(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
        {
          model: ProductImg,
          as: "images",
          attributes: ["id", "src", "color"],
        },
      ],
      order: [
        ["price", "DESC"],
        ["images", "id", "ASC"],
      ],
      limit: 10,
    });

    new Ok({
      message: "get list product success!",
      metadata: products,
    }).send(res);
  }

  async getProductPopular(req, res) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
        {
          model: ProductImg,
          as: "images",
          attributes: ["id", "src", "color"],
        },
      ],
      order: [["price"], ["images", "id", "ASC"]],
      limit: 10,
    });

    new Ok({
      message: "get list product success!",
      metadata: products,
    }).send(res);
  }

  async getByCategory(req, res) {
    const { type } = req.query;
    const category = await Category.findOne({
      where: { slug: type },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.findAll({
      where: { category_id: category.id },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
        {
          model: ProductImg,
          as: "images",
          attributes: ["id", "src", "color"],
        },
      ],
      order: [["images", "id", "ASC"]],
      limit: 10,
    });

    return new Ok({
      message: "Get list product by type success!",
      metadata: products,
    }).send(res);
  }

  async getByAlias(req, res) {
    const alias = req.params.alias;
    const product = await Product.findOne({
      where: { alias },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["name", "slug"],
        },
        {
          model: ProductImg,
          as: "images",
          attributes: ["id", "src", "color"],
        },
        {
          model: ProductVariant,
          as: "variants",
          attributes: ["color", "size", "inventory_quantity"],
        },
      ],
    });

    return new Ok({
      message: "Get product success!",
      metadata: product,
    }).send(res);
  }

  async createProduct(req, res) {
    const { name, description, featuredImage, price, type, images, variants } =
      req.body;

    let category = await Category.findOne({
      where: { name: type },
    });
    if (!category) {
      category = await Category.create({ name: type });
    }

    const product = await Product.create({
      name,
      description,
      price,
      featured_image: featuredImage,
      category_id: category.id,
    });

    for (const image of images) {
      await ProductImg.create({
        src: image.src,
        color: image.color,
        product_id: product.id,
      });
    }

    for (const variant of variants) {
      await ProductVariant.create({
        product_id: product.id,
        color: variant.color,
        size: variant.size,
        inventory_quantity: variant.inventory_quantity,
      });
    }
    new Ok({
      message: "Create product successfully!",
      metadata: product,
    }).send(res);
  }
}
module.exports = new ProductController();
