const { userAuth } = require("../middelwar/auth.js");
const express = require("express");
const User = require("../models/user.js");
const userRouter = express.Router();
const Team = require("../models/teams.js");

userRouter.get("/my-employees", userAuth, async (req, res) => {
  try {
    if (req.user.role !== "manager") {
      return res.status(403).json({ error: "Access denied" });
    }

    const teams = await Team.find({ manager: req.user._id }).select("members");

    const memberIds = teams.flatMap((team) => team.members);

    const employees = await User.find({
      _id: { $in: memberIds },
      role: "employee",
    }).select("fullName email photoURL");

    res.json({ employees });
  } catch (error) {
    console.error("Error fetching employees:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { userRouter };
