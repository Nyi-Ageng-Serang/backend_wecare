const Category = require("../models/Category");
const Post = require("../models/Post");
const User = require("../models/User"); // Pastikan model User sudah ada

module.exports = {
  // Menambahkan kategori baru
  addCategory: async (req, res) => {
    const { name, description } = req.body;

    try {
      // Cek apakah kategori sudah ada
      const existingCategory = await Category.findOne({ name });
      if (existingCategory) {
        return res.status(400).json({ message: "Kategori sudah ada" });
      }

      const newCategory = new Category({ name, description });
      await newCategory.save();

      res.status(201).json({ message: "Kategori berhasil ditambahkan", category: newCategory });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambahkan kategori", error });
    }
  },

  // Mendapatkan semua kategori
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.find().select("name");
      res.status(200).json({ categories });
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil kategori", error });
    }
  },

  // Menambahkan postingan baru
  addPost: async (req, res) => {
    const { category, title, content } = req.body;
    const userId = req.user.id;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

      const newPost = new Post({
        category,
        user: userId,
        userName: user.fullName, // Asumsikan User memiliki field fullName
        title,
        content,
      });

      await newPost.save();

      res.status(201).json({ message: "Postingan berhasil ditambahkan", post: newPost });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambahkan postingan", error });
    }
  },

  // Menambahkan komentar pada postingan
  addComment: async (req, res) => {
    const { postId, content } = req.body;
    const userId = req.user.id;

    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

      const post = await Post.findById(postId);
      if (!post) return res.status(404).json({ message: "Postingan tidak ditemukan" });

      const comment = {
        user: userId,
        userName: user.fullName, 
        content,
      };

      post.comments.push(comment);
      await post.save();

      res.status(201).json({ message: "Komentar berhasil ditambahkan", post });
    } catch (error) {
      res.status(500).json({ message: "Gagal menambahkan komentar", error });
    }
  },

  // Mendapatkan postingan berdasarkan kategori
  getPostsByCategory: async (req, res) => {
    const { categoryId } = req.params;

    try {
      const posts = await Post.find({ category: categoryId })
        .populate("user", "fullName")
        .populate("comments.user", "fullName");

      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil postingan", error });
    }
  },
  
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 }) // Mengurutkan berdasarkan createdAt, terbaru di atas
        .populate("user", "fullName") // Menampilkan nama user yang membuat postingan
        .populate("comments.user", "fullName"); // Menampilkan nama user yang mengomentari

      res.status(200).json({ posts });
    } catch (error) {
      res.status(500).json({ message: "Gagal mengambil postingan", error });
    }
  },


};
