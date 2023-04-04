const cors = require("cors");
const express = require("express");
const route = require("./routes");
const app = express();
app.use(express.json());
app.use(cors());

route(app);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
