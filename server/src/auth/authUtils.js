const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../helpers/asyncHandler");
const { AuthFailureError, NotFoundError } = require("../core/error.response");
const { KeyToken } = require("../models");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });

    const refreshToken = await jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });

    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("error verify::", err);
      } else {
        console.log("decode verify::", decode);
      }
    });

    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

/*
  1 -  check userId missing???
  2 -  get accessToken
  3 -  verifyToken
  4 -  check user in dbs
  5 -  check keyStore with userId
  6 -  Ok all => next()
   */
const authentication = asyncHandler(async (req, res, next) => {
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError("Invalid request");

  const keyStore = await KeyToken.findOne({ where: { user_id: userId } });
  if (!keyStore) throw new NotFoundError("Not found keyStore");
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    try {
      const decodeUser = jwt.verify(accessToken, keyStore.dataValues.publicKey);
      if (userId != decodeUser.userId)
        throw new AuthFailureError("Invalid request");
      req.keyStore = keyStore.dataValues;
      req.user = decodeUser;
      return next();
    } catch (error) {
      throw error;
    }
  }

  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    try {
      const decodeUser = jwt.verify(
        refreshToken,
        keyStore.dataValues.publicKey
      );
      if (userId !== decodeUser.userId.toString()) {
        throw new AuthFailureError("Invalid request!");
      }
      req.keyStore = keyStore.dataValues;
      req.refreshToken = refreshToken;
      req.user = decodeUser;
      return next();
    } catch (error) {
      throw error;
    }
  }
});

module.exports = { createTokenPair, authentication };
