const router = require('express').Router();

// Documentation route
router.use('/', require('./swagger'));

// Collection 1
router.use('/movies', require('./movies'));

// Collection 2
router.use('/directors', require('./directors'));

module.exports = router;