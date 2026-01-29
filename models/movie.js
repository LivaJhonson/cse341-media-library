const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Movie title is required']
  },
  releaseYear: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1888, 'Year must be after the first movie ever made'] // Extra validation
  },
  genre: {
    type: String,
    required: [true, 'Genre is required']
  },
  rating: {
    type: String,
    required: [true, 'Rating is required']
  },
  runtime: {
    type: String, // or Number, depending on your data format like "120 min"
    required: [true, 'Runtime is required']
  },
  director: {
    type: String,
    required: [true, 'Director name is required']
  },
  studio: {
    type: String,
    required: [true, 'Studio is required']
  }
});

module.exports = mongoose.model('Movie', movieSchema);