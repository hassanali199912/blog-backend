const express = require("express");
const router = express.Router();

const userControllers = require("../../controllers/users/users");
const userMiddleware = require("../../middleware/validation/users");
const isAuth = require("../../middleware/auth/is_auth");

router.get("/", isAuth, userControllers.getUser);
router.post(
  "/regester",
  userMiddleware.userSignupValidation,
  userControllers.singup
);
router.post(
  "/login",
  userMiddleware.userLoginValidation,
  userControllers.login
);
router.post("/update", isAuth, userControllers.updateUser);

module.exports = router;
