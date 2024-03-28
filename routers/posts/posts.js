const express = require("express");
const router = express.Router();

//generals
router.get("/");
router.get("/post/:postId");

router.post("/like/:postId");
router.post("/comment/:postId");

module.exports = router;
