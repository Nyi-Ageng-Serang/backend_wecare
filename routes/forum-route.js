const express = require("express");
const {
  addCategory,
  getAllCategories,
  addPost,
  addComment,
  getPostsByCategory,
  getAllPosts,
  getPostById,
} = require("../controllers/forum-controller");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

// Endpoint untuk kategori
router.post("/category", validateToken, addCategory); // Menambahkan kategori
router.get("/categories", getAllCategories); // Mendapatkan semua kategori

// Endpoint untuk postingan
router.post("/post", validateToken, addPost); // Menambahkan postingan
router.get("/category/:categoryId/posts", getPostsByCategory); // Mendapatkan postingan berdasarkan kategori
router.get("/posts", getAllPosts); // Mendaoatkan semua Postingan disesuaikan dengan waktu terbaru
router.get("/post/:postId", getPostById); // Mendapatkan detail postingan berdasarkan ID

// Endpoint untuk komentar
router.post("/comment", validateToken, addComment); // Menambahkan komentar

module.exports = router;
