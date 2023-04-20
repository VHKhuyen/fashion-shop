const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createErrorHandler } = require("../../middleware/error-handler");
const Customer = require("../models/customer");

class AuthController {
  async register(req, res, next) {
    try {
      const existingCustomer = await Customer.findOne({
        where: { email: req.body.email },
      });

      if (existingCustomer) {
        return next(createErrorHandler("Account already exists!", 409));
      }

      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const newCustomer = await Customer.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      return res.status(200).json({
        success: true,
        message: "Account has been created",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = await Customer.findOne({
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
      const { password, ...infoUser } = user.toJSON();

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
          message: "login successfully",
          infoUser,
        });
    } catch (error) {
      console.log(error);
      return next(createErrorHandler(error, 500));
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("access_token", {
        path: "/",
      });
      res
        .status(200)
        .json({ success: true, message: "logged out successfully" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
