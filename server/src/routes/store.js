const express = require("express");
const router = express.Router();
const StoreController = require("../controllers/StoreController");
const { asyncHandler } = require("../helpers/asyncHandler");
const { authentication } = require("../auth/authUtils");

router
  .get("/", asyncHandler(StoreController.getAllStores))
  .get("/:id", asyncHandler(StoreController.GetStoreById));

//authentication
router.use(authentication);

router
  .post("/", asyncHandler(StoreController.createStore))
  .put("/:id", asyncHandler(StoreController.updateStore))
  .delete("/:id", asyncHandler(StoreController.deleteStore));
module.exports = router;
