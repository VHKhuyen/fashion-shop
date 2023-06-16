const { KeyToken } = require("../models");

class KeyTokenService {
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
  }) => {
    try {
      const keyToken = await KeyToken.findOne({
        where: { user_id: userId },
      });

      if (keyToken) {
        keyToken.user_id = userId;
        keyToken.publicKey = publicKey;
        keyToken.privateKey = privateKey;
        keyToken.refreshToken = refreshToken;
        keyToken.save();
      } else {
        const newTokenKey = await KeyToken.create({
          user_id: userId,
          publicKey: publicKey,
          privateKey: privateKey,
          refreshToken: refreshToken,
        });
        return newTokenKey ? newTokenKey.publicKey : null;
      }
      return keyToken ? keyToken.publicKey : null;
    } catch (error) {
      return error;
    }
  };
}

module.exports = KeyTokenService;
