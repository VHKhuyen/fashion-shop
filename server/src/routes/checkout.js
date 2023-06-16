const express = require("express");
const router = express.Router();
const CheckoutController = require("../controllers/CheckoutController");
const { asyncHandler } = require("../helpers/asyncHandler");

router.post("", asyncHandler(CheckoutController.checkoutReview));
module.exports = router;
