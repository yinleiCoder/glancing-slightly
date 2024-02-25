const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: { type: [{ type: String }] },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    select: false,
  },
  topics: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }],
    select: false,
  },
}, {timestamps: true});

module.exports = mongoose.model("Post", schema);
