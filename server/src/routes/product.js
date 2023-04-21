const express = require("express");
const router = express.Router();
const ProductController = require("../app/controllers/ProductController");

router
  .get("/", ProductController.getAllProduct)
  .get("/:id", ProductController.getById)
  .get("/:category", ProductController.getByCategory)
  .post("/", ProductController.createProduct);
router
  .put("/:id", ProductController.updateProduct)
  .delete("/:id", ProductController.deleteProduct);
module.exports = router;
