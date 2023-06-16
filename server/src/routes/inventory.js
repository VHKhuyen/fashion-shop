const express = require("express");
const router = express.Router();
const InventoryController = require("../controllers/InventoryController");
const { asyncHandler } = require("../helpers/asyncHandler");

router.get("/", asyncHandler(InventoryController.getAllInventory));
router.patch(
  "/variants",
  asyncHandler(InventoryController.updateProductVariantQuantity)
);
module.exports = router;
