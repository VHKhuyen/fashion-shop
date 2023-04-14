const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createErrorHandler } = require("../../middleware/error-handler");
const User = require("../models/user");

class AuthController {
  async register(req, res, next) {
    try {
      const existingUser = await User.findOne({
        where: { email: req.body.email },
      });

      if (existingUser) {
        return next(createErrorHandler("User already exists!", 409));
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      return res.status(200).json("User has been created.");
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: { email: req.body.email },
      });
      if (!user) {
        return next(createErrorHandler("Wrong email or password!", 404));
      }

      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return next(createErrorHandler("Wrong email or password!", 400));
      }

      const token = jwt.sign({ id: user.id }, "jwtkey");
      const { password, ...other } = user.toJSON();

      res
        .cookie("access_token", token, {
          domain: "localhost",
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          success: true,
          message: "user login successfully",
          other,
        });
    } catch (error) {
      console.log(error);
      return next(createErrorHandler(error, 500));
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("access_token", {
        domain: "localhost",
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      res
        .status(200)
        .json({ success: true, message: "User logged out successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
