const express = require("express");
const { userValidationSchema } = require("../utils/zod.js");
const bcrypt = require("bcrypt");
const UserInstance = require("../models/user.js");
const { z } = require("../utils/zod.js");
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    userValidationSchema.safeParse(req.body);
    console.log(req.body);
    const { fullName, email, password, role, type, phone } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserInstance({
      fullName,
      email,
      password: passwordHash,
      role,
      phone,
      type,
    });
    const newUser = await user.save();
    const token = await newUser.getJWT();
    res.cookie("token", token);
    return res.json({
      message: fullName + " added successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).send("Error : " + error.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await UserInstance.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }
    const isPasswordcorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordcorrect) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = await user.getJWT();
    // console.log(token);
    res.cookie("token", token);

    return res.send(user);
  } catch (error) {
    return res.status(400).send("Error : " + error.message);
  }
});

authRouter.post("/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  return res.send("logout successful");
});

module.exports = { authRouter };
