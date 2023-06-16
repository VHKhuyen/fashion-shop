const { User } = require("../models");

class UserController {
  async getAllUser(req, res) {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password"] },
      });

      res.status(200).json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error" });
    }
  }
}

module.exports = new UserController();
