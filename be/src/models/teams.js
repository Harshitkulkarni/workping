// models/team.js
const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserInstance", // your existing user model
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInstance",
      required: true,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInstance",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", teamSchema);
