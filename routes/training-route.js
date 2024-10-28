const express = require("express");
const {
  addTraining,
  getAllTraining,
  addDaftarPelatihan,
  addDaftarBacaan,
  getDaftarPelatihan,
  getDaftarBacaan,
} = require("../controllers/training-controller");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/training", addTraining);
router.get("/training", getAllTraining);
router.post("/:id/daftar-pelatihan", addDaftarPelatihan);
router.post("/:id/daftar-bacaan", addDaftarBacaan);
router.get("/:id/daftar-pelatihan", getDaftarPelatihan);
router.get("/:id/daftar-bacaan", getDaftarBacaan);

module.exports = router;
