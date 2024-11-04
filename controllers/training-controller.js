const Training = require("../models/Training");

module.exports = {
  getAllTraining: async (req, res) => {
    try {
      const trainings = await Training.find(); 
      res.json(trainings); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addTraining: async (req, res) => {
    const {
      image_url,
      category,
      level,
      provider,
      type,
      registration_url,
      kelas_id,
    } = req.body;

    try {
      // Create a new training instance without checking kelas_id uniqueness
      const newTraining = new Training({
        image_url,
        category,
        level,
        provider,
        type,
        registration_url,
        kelas_id,
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
};
