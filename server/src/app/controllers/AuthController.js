const db = require("../../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createCustomError } = require("../../errors/custom-error");

class AuthController {
  register(req, res) {
    //CHECK EXISTING USER
    const q = "SELECT * FROM users WHERE email = ? OR username = ?";

    db.query(q, [req.body.email, req.body.username], (err, data) => {
      if (err) return res.status(500).json(err);
      if (data.length) return res.status(409).json("User already exists!");

      //Hash the password and create a user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);

      const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
      const values = [req.body.username, req.body.email, hash];

      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User has been created.");
      });
    });
  }

  login(req, res, next) {
    //CHECK USER
    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
      if (err) return next(createCustomError(err, 500));
      if (data.length === 0)
        return next(createCustomError("Wrong username or password!", 404));
      //Check password
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        data[0].password
      );

      if (!isPasswordCorrect)
        return next(createCustomError("Wrong username or password!", 400));
      const token = jwt.sign({ id: data[0].id }, "jwtkey");
      const { password, ...other } = data[0];

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
    });
  }

  logout(req, res) {
    res
      .clearCookie("access_token", {
        domain: "localhost",
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User has been logged out!",
      });
  }
}

module.exports = new AuthController();
