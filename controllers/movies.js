const Movie = require('../models/movie');

// GET all movies
const getAll = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single movie by ID
const getSingle = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found.' });
    }
    res.status(200).json(movie);
  } catch (err) {
    res.status(400).json({ message: 'Invalid Movie ID format.' });
  }
};

// POST - Create Movie
const createMovie = async (req, res) => {
  try {
    const movie = new Movie({
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      rating: req.body.rating,
      runtime: req.body.runtime,
      director: req.body.director,
      studio: req.body.studio
    });

    const response = await movie.save();
    res.status(201).json(response);
  } catch (err) {
    // This catches Mongoose validation errors if any of the 7 fields are missing
    res.status(400).json({ message: err.message || 'Error occurred while creating movie.' });
  }
};

// PUT - Update Movie
const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = {
      title: req.body.title,
      releaseYear: req.body.releaseYear,
      genre: req.body.genre,
      rating: req.body.rating,
      runtime: req.body.runtime,
      director: req.body.director,
      studio: req.body.studio
    };

    const response = await Movie.findByIdAndUpdate(movieId, movie, { new: true, runValidators: true });
    if (!response) {
      return res.status(404).json({ message: 'Movie not found.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE - Delete Movie
const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const response = await Movie.findByIdAndDelete(movieId);
    if (!response) {
      return res.status(404).json({ message: 'Movie not found.' });
    }
    res.status(200).json({ message: 'Movie deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };