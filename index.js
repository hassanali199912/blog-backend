const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const donenv = require("dotenv");
donenv.config();

const DB =
  "mongodb+srv://hassanalihassan1203:LTy5FDZmmz19RPwb@blog-project.lagozgm.mongodb.net/blog-project";

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

/*====================== Users Routers =================== */
const usersRouter = require("./routers/users/users");
app.use("/users", usersRouter);

/*====================== Post Routers =================== */
const postUserRouter = require("./routers/posts/user_posts");
app.use("/admin/post", postUserRouter);

/*====================== Error Routers =================== */
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message || "Interval Server Error !";
  const data = error.data;

  res.status(status).json({
    status: "failed",
    message: message,
    data: data,
  });
});

mongoose
  .connect(DB)
  .then((result) => {
    console.log("Successfully connected to database");
    app.listen(8080, () => {
      console.log("Server is running on port 8080: http://localhost:8080");
    });
  })
  .catch((err) => {
    console.log(err);
  });
