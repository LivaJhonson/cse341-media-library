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
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false, // ✅ only create session if user logs in
    cookie: {
      secure: true,          // must be true for HTTPS on Render
      sameSite: 'none',      // allows cross-origin cookies
      httpOnly: true
    }
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    origin: "https://cse341-media-library.onrender.com", // allow only your domain
    credentials: true       // ✅ allows cookies to be sent
  }))
  .use('/', require('./routes')); // all routes

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

// Passport serialize / deserialize
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
