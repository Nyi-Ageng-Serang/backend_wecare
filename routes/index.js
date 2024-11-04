const express = require("express");
const authRoute = require("./auth-route");
const trainingRoute = require("./training-route")
const forumRoute = require("./forum-route")

const router = express.Router();

router.use("/auth", authRoute);
router.use("/", trainingRoute);
router.use("/forum", forumRoute);

module.exports = router;
