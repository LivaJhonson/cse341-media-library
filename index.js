const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const routes = require('./routes');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json()) // Parse incoming JSON requests
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow cross-origin requests
    next();
  })
  .use('/', routes); // Use the main router

// Initialize Database then start the server
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});