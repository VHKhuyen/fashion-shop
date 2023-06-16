const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { asyncHandler } = require("../helpers/asyncHandler");
const { authentication } = require("../auth/authUtils");

router
  .get("/", asyncHandler(ProductController.getAllProduct))
  .get("/:id", asyncHandler(ProductController.getById))
  .get("/:category", asyncHandler(ProductController.getByCategory));

//check authentication
router.use(authentication);
router
  .post("/", asyncHandler(ProductController.createProduct))
  .put("/:id", asyncHandler(ProductController.updateProduct))
  .delete("/:id", asyncHandler(ProductController.deleteProduct));
module.exports = router;
