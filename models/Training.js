// models/Training.js
const mongoose = require("mongoose");

// Skema untuk daftar pelatihan (nama dan link)
const pelatihanSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

// Skema untuk daftar bacaan (link dan sumber)
const bacaanSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  sumber: {
    type: String,
    required: true,
  },
});

// Skema Training
const trainingSchema = new mongoose.Schema({
  bidang: {
    type: String,
    required: true,
  },
  daftarPelatihan: [pelatihanSchema], // Array objek untuk pelatihan (nama dan link)
  daftarBacaan: [bacaanSchema],       // Array objek untuk bacaan (link dan sumber)
});

// Model Training
const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;
