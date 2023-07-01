require("dotenv").config();
const cors = require("cors");
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes");
const app = express();

app.use(morgan("dev"));

app.use(helmet());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [process.env.URL_REACT1, process.env.URL_REACT2],
    credentials: true,
  })
);

// router
routes(app);

// Handing error

app.use((req, res, next) => {
  const error = new Error("Not found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    message: error.message || "Internal Server Error!",
  });
});

module.exports = app;
