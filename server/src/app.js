const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const route = require("./routes");
const { notFound, errorHandler } = require("./middlewares/error-handler");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

route(app);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
