const express = require("express");
const { regis, login, updateProfile, detailProfile } = require("../controllers/auth-controller");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", regis);
router.post("/login", login);
router.put("/update-profile", validateToken, updateProfile);
router.get("/profile", validateToken, detailProfile);

module.exports = router;
