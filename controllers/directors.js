const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('directors').find();
    const lists = await result.toArray();
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid director id to find a director.' });
  }
  const directorId = new ObjectId(req.params.id);
  try {
    const result = await mongodb.getDb().db().collection('directors').find({ _id: directorId });
    const lists = await result.toArray();
    if (lists.length > 0) {
      res.status(200).json(lists[0]);
    } else {
      res.status(404).json({ message: 'Director not found.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE (POST) - Includes Validation
const createDirector = async (req, res) => {
  // VALIDATION: Check for required fields
  if (!req.body.name || !req.body.nationality) {
    return res.status(400).json({ message: 'Missing required fields: name and nationality.' });
  }

  const director = {
    name: req.body.name,
    nationality: req.body.nationality
  };

  try {
    const response = await mongodb.getDb().db().collection('directors').insertOne(director);
    res.status(201).json(response);
  } catch (err) {
    res.status(500).json({ message: 'Error occurred while creating director.' });
  }
};

// UPDATE (PUT) - Includes ID Validation and Field Validation
const updateDirector = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid director id to update a director.' });
  }
  
  if (!req.body.name || !req.body.nationality) {
    return res.status(400).json({ message: 'Data to update cannot be empty.' });
  }

  const directorId = new ObjectId(req.params.id);
  const director = {
    name: req.body.name,
    nationality: req.body.nationality
  };

  try {
    const response = await mongodb.getDb().db().collection('directors').replaceOne({ _id: directorId }, director);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while updating the director.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE - Includes ID Validation
const deleteDirector = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Must use a valid director id to delete a director.' });
  }
  const directorId = new ObjectId(req.params.id);
  try {
    const response = await mongodb.getDb().db().collection('directors').deleteOne({ _id: directorId });
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json({ message: 'Some error occurred while deleting the director.' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createDirector, updateDirector, deleteDirector };