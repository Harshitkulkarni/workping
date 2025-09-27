const mongoose = require("mongoose");

const updatesformschema = new mongoose.Schema(
  {
    ticketNumber: { type: Number, required: true, unique: true },

    status: {
      type: String,
      required: true,
      enum: ["pending", "in-progress", "completed"],
    },
    comments: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInstance",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("updatesform", updatesformschema);
