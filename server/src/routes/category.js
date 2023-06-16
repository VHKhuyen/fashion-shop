const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");
const { asyncHandler } = require("../helpers/asyncHandler");

router.get("/", asyncHandler(CategoryController.getAllCategory));

module.exports = router;
