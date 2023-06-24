const app = require("./src/app");

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Exit server express!");
  });
});

module.exports = app;
