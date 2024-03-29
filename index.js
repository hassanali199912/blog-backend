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
const postAdminRouter = require("./routers/posts/user_posts");
const postUserRouter = require("./routers/posts/posts");
app.use("/admin/post", postAdminRouter);
app.use("/post", postUserRouter);

/*====================== Test =================== */
app.use("/api/test", (req, res, next) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Test is running 🎉🎉🎉🎉🎉🎉",
      data: {
        name: "Hassan Ali",
        email: "hassanalihassan1203@gmail.com",
        phone: "01553880080",
      },
      user_meggage: "Witting to work together some day ❤😊 ",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
});

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
