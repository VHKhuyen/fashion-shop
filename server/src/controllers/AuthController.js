const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { BadRequestError, AuthFailureError } = require("../core/error.response");
const { Ok, Create } = require("../core/success.response");
const { User, KeyToken } = require("../models");
const KeyTokenService = require("../services/keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { setCookie } = require("../helpers/setCookie");

class AuthController {
  /*
  1 - check email exists in dbs
  2 - hash password
  3 - create AT vs RT and save 
  4 - get data return register
   */
  async register(req, res, next) {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestError("Account already exists!");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hash,
    });

    if (newUser.dataValues) {
      const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
        modulusLength: 1024,
        publicKeyEncoding: { type: "pkcs1", format: "pem" },
        privateKeyEncoding: { type: "pkcs1", format: "pem" },
      });
      const tokens = await createTokenPair(
        {
          userId: newUser.dataValues.user_id,
          email,
        },
        publicKey,
        privateKey
      );

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newUser.dataValues.user_id,
        publicKey,
        privateKey,
        refreshToken: tokens.refreshToken,
      });

      if (!keyStore) {
        throw new BadRequestError("keyStore error");
      }

      setCookie(res, tokens.accessToken, tokens.refreshToken);

      return new Create({
        message: "Account has been created",
        metadata: { newUser: newUser.dataValues, tokens },
      }).send(res);
    }
    new Ok({
      message: "Account has been created",
    }).send(res);
  }

  /*
  1 - check email in dbs
  2 - match password
  3 - create AT vs RT and save 
  4 - get data return login
   */
  async login(req, res, next) {
    const email = req.body.email;
    //Check email
    const user = await User.findOne({
      where: { email },
    });
    if (!user) throw new AuthFailureError("Wrong email or password!");

    //Check password
    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) throw new AuthFailureError("Wrong email or password!");

    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 1024,
      publicKeyEncoding: { type: "pkcs1", format: "pem" },
      privateKeyEncoding: { type: "pkcs1", format: "pem" },
    });

    console.log(publicKey, privateKey);

    const tokens = await createTokenPair(
      {
        userId: user.user_id,
        email,
      },
      publicKey,
      privateKey
    );
    console.log(tokens);

    const keyStore = await KeyTokenService.createKeyToken({
      userId: user.user_id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken,
    });

    if (!keyStore) {
      throw new BadRequestError("keyStore error");
    }

    const { password, ...infoUser } = user.dataValues;

    setCookie(res, tokens.accessToken, tokens.refreshToken);

    new Ok({
      message: "login successfully",
      metadata: { user: infoUser, tokens: tokens },
    }).send(res);
  }

  async logout(req, res, next) {
    const deleKey = await KeyToken.destroy({
      where: { user_id: req.keyStore.user_id },
    });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    new Ok({
      message: "Logout success!",
      metadata: deleKey,
    }).send(res);
  }
}

module.exports = new AuthController();
