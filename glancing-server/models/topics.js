const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  banner: { type: String },
  introduction: { type: String, select: false },
}, {timestamps: true});

module.exports = mongoose.model("Topic", schema);
