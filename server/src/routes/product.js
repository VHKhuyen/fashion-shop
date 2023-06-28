const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
const { asyncHandler } = require("../helpers/asyncHandler");
const { authentication } = require("../auth/authUtils");

router
  .get("/", asyncHandler(ProductController.getAllProduct))
  .get("/new", asyncHandler(ProductController.getProductNew))
  .get("/popular", asyncHandler(ProductController.getProductPopular))
  .get("/discount", asyncHandler(ProductController.getProductDiscount))
  .post("/search", asyncHandler(ProductController.searchProduct))
  .get("/category", asyncHandler(ProductController.getByCategory))
  .get("/:alias", asyncHandler(ProductController.getByAlias));

//check authentication
// router.use(authentication);

router.post("/", asyncHandler(ProductController.createProduct));
module.exports = router;
