const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("please LogIn ");
    }
    const decodedData = await jwt.verify(token, process.env.JWT_TOKEN);
    const { _id } = decodedData;

    const user = await User.findById({ _id: _id });
    if (!user) {
      throw new Error("user do not exist");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { userAuth };
