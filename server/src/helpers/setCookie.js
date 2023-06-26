const accessTokenMaxAge = 2 * 24 * 60 * 60 * 1000;
const refreshTokenMaxAge = 7 * 24 * 60 * 60 * 1000;

const setCookie = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    domain: process.env.DOMAIN_CLIENT,
    maxAge: accessTokenMaxAge,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    domain: process.env.DOMAIN_CLIENT,
    maxAge: refreshTokenMaxAge,
  });
};

module.exports = { setCookie };
