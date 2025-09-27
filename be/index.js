require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./src/config/database");
const cors = require("cors");

const app = express();

const port = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
const { authRouter } = require("./src/routes/auth.js");
const { updatesformRouter } = require("./src/routes/updatesformroutes.js");
const { teamRouter } = require("./src/routes/teamRoutes.js");
const { userRouter } = require("./src/routes/userRouter.js");
const { taskRouter } = require("./src/routes/taskRouter.js");
const { reviewRouter } = require("./src/routes/reviewRouter.js");

app.use("/users", userRouter);
app.use("/", updatesformRouter);
app.use("/", authRouter);
app.use("/", teamRouter);
app.use("/", taskRouter);
app.use("/review", reviewRouter);

connectDB()
  .then(() => {
    console.log("connected to db successful");
    app.listen(port, () => {
      console.log("listing a port ", port);
    });
  })
  .catch(
    console.log((err) => {
      console.log("error in connecting to db " + err.message);
    })
  );
