const { userAuth } = require("../middelwar/auth.js");
const Team = require("../models/teams.js");
const express = require("express");
const teamRouter = express.Router();
const User = require("../models/user.js");

teamRouter.post("/create", userAuth, async (req, res) => {
  try {
    if (!["admin"].includes(req.user.role)) {
      return res.status(403).json({ error: "Not authorized to create teams" });
    }

    const { name, description, memberIds, manager } = req.body;
    const team = new Team({
      name,
      description,
      members: memberIds,
      manager, // array of user IDs
      createdBy: req.user._id,
    });
    const savedTeam = await team.save();
    const managerUser = await User.findById(manager);
    if (managerUser.role !== "manager") {
      managerUser.role = "manager";
      await managerUser.save();
    }

    res.status(201).json({ message: "Team created", data: savedTeam });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

teamRouter.get("/myteams", userAuth, async (req, res) => {
  try {
    const teams = await Team.find({ members: req.user._id }).populate(
      "members",
      "fullName email role photoURL"
    );
    if (!teams || teams.length === 0) {
      return res.status(404).json({ error: "No teams found" });
    }
    res.json({ teams });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

teamRouter.get("/employees", userAuth, async (req, res) => {
  try {
    const employees = await User.find({ role: "employee" }).select(
      "fullName email role photoURL"
    );
    res.json({ users: employees });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

teamRouter.get("/myteams/:id", userAuth, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate("members", "fullName email role type photoURL")
      .populate("createdBy", "fullName email");

    if (!team) return res.status(404).json({ error: "Team not found" });

    res.json({ team });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = { teamRouter };
