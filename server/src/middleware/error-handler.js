const { CustomAPIError, createCustomError } = require("../errors/custom-error");

const notFound = (req, res, next) => {
  next(createCustomError(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  return res.status(500).json({
    success: false,
    message: "Something went wrong, please try again",
  });
};

module.exports = { notFound, errorHandler };
