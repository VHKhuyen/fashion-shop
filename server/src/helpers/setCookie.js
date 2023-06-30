const accessTokenMaxAge = 2 * 24 * 60 * 60 * 1000;
const refreshTokenMaxAge = 7 * 24 * 60 * 60 * 1000;

const setCookie = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    domain: "jenta.site",
    maxAge: accessTokenMaxAge,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    domain: "jenta.site",
    maxAge: refreshTokenMaxAge,
  });
};

module.exports = { setCookie };
