const router = require('express').Router();
const passport = require('passport');
const { isAuthenticated } = require('../middleware/auth'); // make sure this points to your auth middleware

// Swagger UI
router.use('/', require('./swagger'));

// API Routes
router.use('/movies', require('./movies'));
router.use('/directors', require('./directors'));

// Home route to check login status
router.get('/', (req, res) => {
    res.send(req.user !== undefined ? `Logged in as ${req.user.displayName}` : "Logged Out");
});

// Auth Routes
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
  (req, res) => {
    req.session.user = req.user; // store user in session for auth middleware
    res.redirect('/api-docs');    // redirect to Swagger UI
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) return next(err);
    req.session.destroy(); // destroy session on logout
    res.redirect('/');
  });
});

module.exports = router;
