const {
  Product,
  Category,
  ProductImg,
  ProductVariant,
} = require("../models/product");

class ProductController {
  async getAllProduct(req, res) {
    try {
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
            attributes: ["img_id", "imgUrl", "color"],
          },
          {
            model: ProductVariant,
            as: "variants",
            attributes: ["color", "size", "quantity_in_stock"],
          },
        ],
        order: [
          ["images", "img_id", "asc"],
          ["variants", "product_variants_id", "ASC"],
        ],
      });

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async getAllCategory(req, res) {
    try {
      const categories = await Category.findAll();

      return res.status(201).json({
        success: true,
        message: "all categories",
        categories,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to get categories" });
    }
  }

  async getByCategory(req, res) {
    try {
      const categoryName = req.params.categoryName;

      // Tìm danh mục sản phẩm theo tên
      const category = await Category.findOne({
        where: { name: categoryName },
      });

      // Nếu không tìm thấy danh mục, trả về 404 Not Found
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      // Lấy tất cả các sản phẩm có liên quan đến danh mục
      const products = await Product.findAll({
        where: { category_id: category.category_id },
      });

      // Trả về danh sách sản phẩm dưới dạng JSON
      return res.status(201).json({
        success: true,
        message: "create product successfully.",
        products,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to get products" });
    }
  }

  async getById(req, res) {
    try {
      const product = await Product.findOne({
        where: { product_id: req.params.id },
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["name"],
          },
          {
            model: ProductImg,
            as: "images",
            attributes: ["img_id", "imgUrl", "color"],
          },
          {
            model: ProductVariant,
            as: "variants",
            attributes: ["color", "size", "quantity_in_stock"],
          },
        ],
      });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to get product" });
    }
  }

  async createProduct(req, res) {
    const {
      name,
      description,
      images,
      unitPrice,
      quantityInStock,
      categoryName,
      variants,
    } = req.body;

    try {
      // Kiểm tra xem category có tồn tại hay không
      let category = await Category.findOne({ where: { name: categoryName } });

      // Nếu không có category, tạo mới một category
      if (!category) {
        category = await Category.create({ name: categoryName });
      }

      // Tạo một sản phẩm mới và liên kết với category
      const product = await Product.create({
        name,
        description,
        unit_price: unitPrice,
        quantity_in_stock: quantityInStock,
        category_id: category.category_id,
      });

      // Thêm ảnh sản phẩm
      for (const image of images) {
        await ProductImg.create({
          imgUrl: image.imgUrl,
          color: image.color,
          product_id: product.product_id,
        });
      }

      // Thêm các biến thể sản phẩm
      for (const variant of variants) {
        await ProductVariant.create({
          color: variant.color,
          size: variant.size,
          quantity_in_stock: variant.quantityInStock,
          product_id: product.product_id,
        });
      }

      // Trả về kết quả thành công
      return res.status(201).json({
        success: true,
        message: "create product successfully.",
        product,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to create product" });
    }
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, unitPrice, quantityInStock, categoryId } =
      req.body;
    try {
      const product = await Product.findOne({ where: { product_id: id } });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      product.name = name;
      product.description = description;
      product.unit_price = unitPrice;
      product.quantity_in_stock = quantityInStock;
      product.category_id = categoryId;
      await product.save();
      return res.status(200).json(product);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to update product" });
    }
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findOne({ where: { product_id: id } });
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      await product.destroy();
      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to delete product" });
    }
  }
}

module.exports = new ProductController();
