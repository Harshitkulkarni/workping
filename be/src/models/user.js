const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, maxLength: 16 },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["employee", "manager", "admin"],
      default: "employee",
    },
    type: {
      type: String,
      required: true,
      enum: ["developer", "tester"],
    },
    photoURL: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/000/550/731/original/user-icon-vector.jpg",
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserInstance",
    },
  },
  { timestamps: true }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
    expiresIn: "1d",
  });
  return token;
};

module.exports = mongoose.model("UserInstance", userSchema);
