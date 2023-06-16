const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { authentication } = require("../auth/authUtils");
const { asyncHandler } = require("../helpers/asyncHandler");

router.post("/register", asyncHandler(AuthController.register));
router.post("/login", asyncHandler(AuthController.login));

//authentication
router.use(authentication);

router.get("/logout", asyncHandler(AuthController.logout));
router.post(
  "/handleRefreshToken",
  asyncHandler(AuthController.handleRefreshToken)
);
module.exports = router;
asyncHandler;
