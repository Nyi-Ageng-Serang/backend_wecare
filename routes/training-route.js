const express = require("express");
const { addTraining, getAllTraining, addDaftarPelatihan, addDaftarBacaan } = require("../controllers/training-controller");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/training", addTraining);
router.get("/training", getAllTraining);
router.post("/:id/daftar-pelatihan", addDaftarPelatihan);
router.post("/:id/daftar-bacaan", addDaftarBacaan);

module.exports = router;
