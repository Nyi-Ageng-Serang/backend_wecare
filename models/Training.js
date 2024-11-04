const mongoose = require("mongoose");

const trainingSchema = new mongoose.Schema({
  image_url: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  registration_url: {
    type: String,
    required: true,
  },
  kelas_id: {
    type: String,
    required: true,
  },
});

// Model Training
const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;
