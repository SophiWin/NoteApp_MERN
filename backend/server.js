const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const notesRoutes = require("./routes/notes");
const usersRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middlewares/AuthMiddleware");

const app = express();
const mongoURL =
  "mongodb+srv://win:RSybCAwzrO3iJu33@note-cluster.fdtc8.mongodb.net/?retryWrites=true&w=majority&appName=note-cluster";
mongoose.connect(mongoURL).then(() => {
  console.log("connected to db");
  app.listen(process.env.PORT, () => {
    console.log("app is running on port:" + process.env.PORT);
  });
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/notes", AuthMiddleware, notesRoutes);
app.use("/api/users", usersRoutes);
