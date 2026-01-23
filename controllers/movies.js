const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all movies
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('movies').find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET single movie by ID
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid movie id to find a movie.' });
  }
  try {
    const movieId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('movies').find({ _id: movieId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Movie not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST - Create Movie with 7-field Validation
const createMovie = async (req, res) => {
  if (!req.body.title || !req.body.releaseYear || !req.body.genre || !req.body.rating || !req.body.runtime || !req.body.director || !req.body.studio) {
    return res.status(400).json({ message: 'Missing required fields. Please provide all 7 fields.' });
  }

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
    const response = await mongodb.getDb().db().collection('movies').insertOne(movie);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred while creating movie.' });
  }
};

// PUT - Update Movie
const updateMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid movie id to update.' });
  }

  // Adding validation to PUT as well
  if (!req.body.title || !req.body.releaseYear || !req.body.genre || !req.body.rating || !req.body.runtime || !req.body.director || !req.body.studio) {
    return res.status(400).json({ message: 'Data to update cannot be empty and must include all 7 fields.' });
  }

  try {
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
    const response = await mongodb.getDb().db().collection('movies').replaceOne({ _id: movieId }, movie);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the movie.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE - Delete Movie
const deleteMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid movie id to delete.' });
  }
  try {
    const movieId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('movies').deleteOne({ _id: movieId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while deleting the movie.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createMovie, updateMovie, deleteMovie };