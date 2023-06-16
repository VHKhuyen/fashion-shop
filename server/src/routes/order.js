const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { asyncHandler } = require("../helpers/asyncHandler");

router.get("/", asyncHandler(OrderController.getAllOrder));
module.exports = router;
