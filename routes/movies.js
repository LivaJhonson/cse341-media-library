const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');
const { isAuthenticated } = require('../middleware/authenticate'); // Import auth check

// Public routes (Anyone can view)
router.get('/', moviesController.getAll);
router.get('/:id', moviesController.getSingle);

// Protected routes (Login required to change data)
router.post('/', isAuthenticated, moviesController.createMovie);
router.put('/:id', isAuthenticated, moviesController.updateMovie);
router.delete('/:id', isAuthenticated, moviesController.deleteMovie);

module.exports = router;