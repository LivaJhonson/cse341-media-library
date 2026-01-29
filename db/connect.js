const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  
  // Mongoose handles the connection pool differently than MongoClient
  mongoose.connect(process.env.MONGODB_URI)
  .then((client) => {
    _db = client;
    console.log('Successfully connected to MongoDB via Mongoose!'); 
    callback(null, _db);
  })
  .catch((err) => {
    console.error('Connection error:', err); 
    callback(err);
  });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb
};