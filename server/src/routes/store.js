const express = require("express");
const router = express.Router();
const StoreController = require("../app/controllers/StoreController");

router
  .get("/", StoreController.getAllStores)
  .get("/:id", StoreController.GetStoreById)
  .post("/", StoreController.createStore);
router
  .put("/:id", StoreController.updateStore)
  .delete("/:id", StoreController.deleteStore);
module.exports = router;
