const express = require("express");
const router = express.Router();
const CartController = require("../controllers/CartController");
const { asyncHandler } = require("../helpers/asyncHandler");

router.post("", asyncHandler(CartController.addToCart));
router.delete("", asyncHandler(CartController.deleteCartItem));
router.post("/update", asyncHandler(CartController.updateCart));
router.get("", asyncHandler(CartController.getListCart));
module.exports = router;
