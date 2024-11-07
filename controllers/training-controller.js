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
      title,
      level,
      provider,
      type,
      registration_url,
    } = req.body;

    try {
      // Buat instance Training baru
      const newTraining = new Training({
        image_url,
        category,
        title,
        level,
        provider,
        type,
        registration_url,
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
