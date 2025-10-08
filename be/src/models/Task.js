// models/taskAssignment.js
const mongoose = require("mongoose");

const taskAssignmentSchema = new mongoose.Schema({
  ticketNumber: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: [
      "pending",
      "to do",
      "in-progress",
      "review",
      "completed",
      "cancelled",
    ],
    default: "to do",
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInstance",
    required: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserInstance",
    required: true,
  },
  assignedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("TaskAssignment", taskAssignmentSchema);
