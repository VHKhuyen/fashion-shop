const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { asyncHandler } = require("../helpers/asyncHandler");

router.get("/:id", asyncHandler(OrderController.getOrderById));
router.post("/", asyncHandler(OrderController.createOrder));
module.exports = router;
