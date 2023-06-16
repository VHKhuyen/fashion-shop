const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/UserController");
const { asyncHandler } = require("../helpers/asyncHandler");

router
  .get("/", asyncHandler(ProductController.getAllCustomer))
  .post("/", asyncHandler(ProductController.createCustomer));
module.exports = router;
