const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('directors').find();
    result.toArray().then((lists) => {
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createDirector = async (req, res) => {
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

module.exports = { getAll, createDirector };