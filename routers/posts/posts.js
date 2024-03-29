const express = require("express");
const router = express.Router();

const postControllers = require("../../controllers/posts/posts");

//generals
router.get("/", postControllers.getAll);
router.get("/getsingle/:postId", postControllers.getById);

router.post("/like/:postId");
router.post("/comment/:postId");

module.exports = router;
