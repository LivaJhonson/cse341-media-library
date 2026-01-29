const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/movies', require('./movies'));
router.use('/directors', require('./directors'));

// Home route to check login status
router.get('/', (req, res) => {
    res.send(req.user !== undefined ? `Logged in as ${req.user.displayName}` : "Logged Out");
});

// Auth Routes
router.get('/login', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
  (req, res) => {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;