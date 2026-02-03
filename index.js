const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  // Required for Render to trust the headers sent through their proxy
  .set('trust proxy', 1) 
  .use(session({
    secret: "secret", 
    resave: false,
    saveUninitialized: true,
    // Added cookie settings to support HTTPS on Render
    cookie: { 
      secure: true, 
      sameSite: 'none' 
    }
  }))
  .use(passport.initialize())
  .use(passport.session())
  // Updated CORS to allow credentials (cookies) to pass through
  .use(cors({ 
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'], 
    origin: '*',
    credentials: true
  }))
  .use('/', require('./routes')); // Handing off all routing logic here

// Passport Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.serializeUser((user, done) => { done(null, user); });
passport.deserializeUser((user, done) => { done(null, user); });

// DB and Server Start
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Successfully connected to MongoDB via Mongoose!`);
    console.log(`Connected to DB and listening on ${port}`);
  }
});