const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: { type: String },
    gender: { type: String, enum: ["male", "female"], default: "male" },
    headline: { type: String },
    locations: { type: [{ type: String }], select: false },
    company: { type: String, select: false },
    educations: {
      type: [
        {
          school: { type: String },
          major: { type: String },
          diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
        },
      ],
      select: false,
    },
    // 我关注的人
    following: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      select: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
