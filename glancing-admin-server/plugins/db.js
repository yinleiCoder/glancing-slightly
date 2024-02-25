module.exports = (app) => {
  const path = require("path");
  const mongoose = require("mongoose");
  mongoose.connect("mongodb://localhost:27017/glancing-slightly");

  require("require-all")(path.join(__dirname, "../models"));
};
