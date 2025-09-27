const express = require("express");
const updatesformRouter = express.Router();
const Updatesform = require("../models/updatesform.js");
const { userAuth } = require("../middelwar/auth.js");

updatesformRouter.post("/updatesform", userAuth, async (req, res) => {
  try {
    const { ticketNumber, status, comments, description } = req.body;
    const user = req.user;
    console.log(user, "here");
    const updatesform = new Updatesform({
      ticketNumber,
      status,
      comments,
      description,
      createdBy: user._id,
    });
    const newupdatesform = await updatesform.save();

    res.json({
      message: "updatesform added successfully",
      data: newupdatesform,
    });
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

updatesformRouter.get("/tasks/:id", userAuth, async (req, res) => {
  try {
    const tasks = await Updatesform.find({ createdBy: req.params.id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = { updatesformRouter };
