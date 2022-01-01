const express = require("express");
const PORT = process.env.PORT || 3000;
// const bot = "./bot/index.js";

const app = express();
app.use("/", (req, res) => {
  res.send("Server working fine");
});

app.listen(PORT, (req, res) => {
  console.log("Server running on " + PORT);
});

module.exports = app;
