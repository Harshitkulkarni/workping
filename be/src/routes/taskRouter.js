const express = require("express");
const { userAuth } = require("../middelwar/auth.js");
const Updatesform = require("../models/updatesform.js");
const User = require("../models/user.js");

const TaskAssignment = require("../models/Task.js");

const taskRouter = express.Router();

taskRouter.post("/assign-task", userAuth, async (req, res) => {
  try {
    const { employeeId, ticketNumber, description } = req.body;

    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only managers can assign tasks" });
    }

    const employee = await User.findById(employeeId);
    if (!employee || employee.role !== "employee") {
      return res.status(404).json({ error: "Employee not found or invalid" });
    }

    const existing = await TaskAssignment.findOne({ ticketNumber });
    if (existing) {
      return res.status(400).json({ error: "Ticket number already assigned" });
    }

    const task = new TaskAssignment({
      ticketNumber,
      description,
      assignedTo: employeeId,
      assignedBy: req.user._id,
    });

    await task.save();

    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
    console.error("Error assigning task:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

taskRouter.get("/my-tasks", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const tasks = await TaskAssignment.find({ assignedTo: userId })
      .populate("assignedBy", "fullName email")
      .select("ticketNumber description assignedAt status");

    res.status(200).json({ tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

taskRouter.get("/tasks/user/:id", userAuth, async (req, res) => {
  try {
    const tasks = await TaskAssignment.find({ assignedTo: req.params.id });
    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

taskRouter.put("/approve-task/:ticketNumber", userAuth, async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Only managers can approve tasks" });
    }

    const task = await TaskAssignment.findOne({
      ticketNumber: req.params.ticketNumber,
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    task.status = "completed";
    await task.save();

    res.json({ message: "Task approved and marked as completed", task });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { taskRouter };
