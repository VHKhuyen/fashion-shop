const { apiKey, permission } = require("../auth/checkAuth");

function route(app) {
  //check ApiKey
  app.use(apiKey);

  //Check permission
  app.use(permission("0000"));

  app.use("/api/v1/products", require("./product.js"));
  app.use("/api/v1/stores", require("./store.js"));
  app.use("/api/v1/auth", require("./auth.js"));
  app.use("/api/v1/cart", require("./cart"));
  app.use("/api/v1/category", require("./category"));
  app.use("/api/v1/checkout", require("./checkout"));
  app.use("/api/v1/customer", require("./customer"));
  app.use("/api/v1/inventory", require("./inventory"));
  app.use("/api/v1/order", require("./order"));
}
module.exports = route;
