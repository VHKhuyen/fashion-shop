const ErrorHandler = require("../utils/ErrorHandler");

const notFound = (req, res, next) => {
  next(createErrorHandler(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  return res.status(500).json({
    success: false,
    message: "Something went wrong, please try again",
  });
};
const createErrorHandler = (msg, statusCode) => {
  return new ErrorHandler(msg, statusCode);
};

module.exports = { notFound, errorHandler, createErrorHandler };
