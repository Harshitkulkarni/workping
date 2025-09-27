const express = require("express");
const { userAuth } = require("../middelwar/auth.js");
const Updatesform = require("../models/updatesform.js");
const User = require("../models/user.js");
const Team = require("../models/teams.js");

const TaskAssignment = require("../models/Task.js");

const reviewRouter = express.Router();

reviewRouter.get("/employees", userAuth, async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Access denied" });
    }

    const teams = await Team.find({ manager: req.user._id }).populate(
      "members",
      "fullName email photoURL role type"
    );
    const employees = teams.flatMap((team) => team.members);

    res.json({ employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

reviewRouter.get("/employee/:id", userAuth, async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Access denied" });
    }

    const tasks = await TaskAssignment.find({ assignedTo: req.params.id });
    const updates = await Updatesform.find({ createdBy: req.params.id });

    res.json({ tasks, updates });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { reviewRouter };
