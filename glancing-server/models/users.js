const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true, select: false },
});

module.exports = mongoose.model("User", schema);