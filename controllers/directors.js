const Director = require('../models/director'); // Ensure you have this model created

// GET ALL
const getAll = async (req, res) => {
  try {
    const directors = await Director.find();
    res.status(200).json(directors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) {
      return res.status(404).json({ message: 'Director not found.' });
    }
    res.status(200).json(director);
  } catch (err) {
    // Mongoose throws an error if the ID format is invalid
    res.status(400).json({ message: 'Invalid Director ID format.' });
  }
};

// CREATE (POST)
const createDirector = async (req, res) => {
  try {
    const director = new Director({
      name: req.body.name,
      nationality: req.body.nationality
    });

    const response = await director.save();
    res.status(201).json(response);
  } catch (err) {
    // This catches Mongoose validation errors (required fields, etc.)
    res.status(400).json({ message: err.message || 'Error occurred while creating director.' });
  }
};

// UPDATE (PUT)
const updateDirector = async (req, res) => {
  try {
    const directorId = req.params.id;
    const updatedDirector = await Director.findByIdAndUpdate(
      directorId,
      {
        name: req.body.name,
        nationality: req.body.nationality
      },
      { new: true, runValidators: true } // runValidators ensures it checks the Schema again
    );

    if (!updatedDirector) {
      return res.status(404).json({ message: 'Director not found.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteDirector = async (req, res) => {
  try {
    const directorId = req.params.id;
    const response = await Director.findByIdAndDelete(directorId);
    
    if (!response) {
      return res.status(404).json({ message: 'Director not found.' });
    }
    res.status(200).json({ message: 'Director deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createDirector, updateDirector, deleteDirector };