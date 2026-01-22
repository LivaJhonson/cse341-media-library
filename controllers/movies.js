const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all movies
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('movies').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single movie by ID
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to find a movie.');
  }
  const movieId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().db().collection('movies').find({ _id: movieId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create Movie with 7-field Validation
const createMovie = async (req, res) => {
  const movie = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    rating: req.body.rating,
    runtime: req.body.runtime,
    director: req.body.director,
    studio: req.body.studio
  };

  // Validation Check
  if (!movie.title || !movie.releaseYear || !movie.genre || !movie.rating || !movie.runtime || !movie.director || !movie.studio) {
    res.status(400).json({ message: 'Missing required fields. Please provide all 7 fields.' });
    return;
  }

  try {
    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred while creating movie.' });
  }
};

// PUT - Update Movie
const updateMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to update.');
  }
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    releaseYear: req.body.releaseYear,
    genre: req.body.genre,
    rating: req.body.rating,
    runtime: req.body.runtime,
    director: req.body.director,
    studio: req.body.studio
  };
  
  try {
    const response = await mongodb.getDb().db().collection('movies').replaceOne({ _id: movieId }, movie);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE - Delete Movie
const deleteMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid movie id to delete.');
  }
  const movieId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('movies').deleteOne({ _id: movieId });
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };