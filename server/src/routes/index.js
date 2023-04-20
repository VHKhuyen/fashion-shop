const courseRouter = require("./course");
const StoreRouter = require("./store.js");
const authRouter = require("./auth");

function route(app) {
  app.use("/api/v1/courses", courseRouter);
  app.use("/api/v1/stores", StoreRouter);
  app.use("/api/v1/auth", authRouter);
}
module.exports = route;
