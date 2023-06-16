const sequelize = require("../db/init.mysql");

class InventoryController {
  async getAllInventory(req, res) {
    try {
      const products = await sequelize.query(`CALL GetAllProductVariant()`);
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }

  async updateProductVariantQuantity(req, res) {
    try {
      const { variant_id: id, quantity } = req.body;
      const productVariant = await sequelize.query(
        "CALL GetProductVariantById(:id, :quantity)",
        {
          replacements: { id, quantity },
        }
      );

      if (!productVariant) {
        return res.status(404).json({ message: "ProductVariant not found" });
      }
      res.status(200).json({ success: true, productVariant });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = new InventoryController();
