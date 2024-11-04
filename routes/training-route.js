// routes/training-routes.js
const express = require("express");
const router = express.Router();
const {getAllTraining, addTraining} = require("../controllers/training-controller");

router.get("/trainings", getAllTraining);

router.post("/trainings", addTraining);

module.exports = router;
