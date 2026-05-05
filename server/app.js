const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/index.js");

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: process.env.CLIENT }));

for (const route in routes) {
  app.use(`/${routes[route].basePath}`, routes[route].router);
}

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
