const mongoose = require('mongoose');

// Define the Schema for a Director
const directorSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Director name is required']
  },
  nationality: {
    type: String,
    required: [true, 'Nationality is required']
  }
});

// Export the model
// Mongoose will automatically look for a collection named "directors" (plural)
module.exports = mongoose.model('Director', directorSchema);