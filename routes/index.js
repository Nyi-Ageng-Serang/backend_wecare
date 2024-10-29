const express = require("express");
const authRoute = require("./auth-route");
const trainingRoute = require("./training-route")

const router = express.Router();

router.use("/auth", authRoute);
router.use("/", trainingRoute);

module.exports = router;
