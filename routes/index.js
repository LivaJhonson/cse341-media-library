const router = require('express').Router();
const passport = require('passport');

// 🔐 Auth routes FIRST
router.get('/login', passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/api-docs');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    req.session.destroy();
    res.redirect('/');
  });
});

// 📦 API routes
router.use('/movies', require('./movies'));
router.use('/directors', require('./directors'));

// 📄 Swagger LAST and ONLY at /api-docs
router.use('/api-docs', require('./swagger'));

// 🏠 Home
router.get('/', (req, res) => {
  res.send(req.user ? `Logged in as ${req.user.displayName}` : 'Logged Out');
});

module.exports = router;
