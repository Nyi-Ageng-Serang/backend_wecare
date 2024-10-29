// controllers/training-controller.js
const Training = require("../models/Training");

module.exports = {
  getAllTraining: async (req, res) => {
    try {
      const trainings = await Training.find();
      res.json({ trainings });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve trainings", error });
    }
  },

  addTraining: async (req, res) => {
    const { bidang, daftarPelatihan, daftarBacaan } = req.body;

    try {
      const existingTraining = await Training.findOne({ bidang });
      if (existingTraining) {
        return res.status(400).json({ message: "Bidang sudah terdaftar" });
      }
      const newTraining = new Training({
        bidang,
        daftarPelatihan,
        daftarBacaan,
      });
      await newTraining.save();
      res.json({
        message: "Training added successfully",
        training: newTraining,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to add training", error });
    }
  },
  addDaftarPelatihan: async (req, res) => {
    const { id } = req.params;
    const { nama, link } = req.body;

    try {
      // Cari training berdasarkan ID
      const training = await Training.findById(id);
      if (!training) return res.status(404).json({ message: "Training not found" });

      // Cek apakah link daftar pelatihan sudah ada
      const existingPelatihan = training.daftarPelatihan.find((pelatihan) => pelatihan.link === link);
      if (existingPelatihan) {
        return res.status(400).json({ message: "Link pelatihan sudah ada" });
      }

      // Tambahkan daftar pelatihan jika tidak ada double
      training.daftarPelatihan.push({ nama, link });
      await training.save();

      res.json({ message: "Daftar pelatihan added successfully", training });
    } catch (error) {
      res.status(500).json({ message: "Failed to add daftar pelatihan", error });
    }
  },

  // Fungsi untuk menambah daftar bacaan (cek jika link bacaan sudah ada)
  addDaftarBacaan: async (req, res) => {
    const { id } = req.params;
    const { link, sumber } = req.body;

    try {
      // Cari training berdasarkan ID
      const training = await Training.findById(id);
      if (!training) return res.status(404).json({ message: "Training not found" });

      // Cek apakah link daftar bacaan sudah ada
      const existingBacaan = training.daftarBacaan.find((bacaan) => bacaan.link === link);
      if (existingBacaan) {
        return res.status(400).json({ message: "Link bacaan sudah ada" });
      }

      // Tambahkan daftar bacaan jika tidak double
      training.daftarBacaan.push({ link, sumber });
      await training.save();

      res.json({ message: "Daftar bacaan added successfully", training });
    } catch (error) {
      res.status(500).json({ message: "Failed to add daftar bacaan", error });
    }
  },

  getDaftarPelatihan: async (req, res) => {
    const { id } = req.params;

    try {
      const training = await Training.findById(id);
      if (!training) return res.status(404).json({ message: "Training not found" });

      res.json({ daftarPelatihan: training.daftarPelatihan });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve daftar pelatihan", error });
    }
  },

  getDaftarBacaan: async (req, res) => {
    const { id } = req.params;

    try {
      const training = await Training.findById(id);
      if (!training) return res.status(404).json({ message: "Training not found" });

      res.json({ daftarBacaan: training.daftarBacaan });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve daftar bacaan", error });
    }
  },
};
