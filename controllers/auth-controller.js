require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = {
  // Metode untuk registrasi
  regis: async (req, res) => {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({ fullName, email, password: hash });

    try {
      await newUser.save();
      res.json({ message: "Registration successful" });
    } catch (error) {
      res.status(500).json({ message: "Registration failed", error });
    }
  },

  // Metode untuk login
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_KEY);

    res.json({ message: "Login successful", token });
  },

  // Metode untuk memperbarui profil pengguna
  updateProfile: async (req, res) => {
    const { id } = req.user; // ID pengguna dari token JWT
    const { fullName, email, birthDate, trainingRecommendation, password } = req.body;
  
    try {
      // Buat objek data update
      const updatedData = { fullName, email, birthDate, trainingRecommendation };
  
      // Jika ada password, hash password tersebut
      if (password) {
        if (password.length < 8) {
          return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
        const salt = bcrypt.genSaltSync(10);
        updatedData.password = bcrypt.hashSync(password, salt);
      }
  
      // Update data pengguna di database
      const updatedUser = await User.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedUser) return res.status(404).json({ message: "User not found" });
  
      res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Profile update error:", error);
      res.status(500).json({ message: "Profile update failed", error });
    }
  },
  

  // Metode untuk mendapatkan detail profil pengguna
  detailProfile: async (req, res) => {
    const { id } = req.user; // Ambil ID pengguna dari token JWT

    try {
      const user = await User.findById(id).select("-password"); // Kecualikan password
      if (!user) return res.status(404).json({ message: "User not found" });

      res.json({ user });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve profile", error });
    }
  },
};
