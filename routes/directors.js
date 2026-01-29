const express = require('express');
const router = express.Router();
const directorsController = require('../controllers/directors');
const { isAuthenticated } = require('../middleware/authenticate'); // Import auth check

// Public routes
router.get('/', directorsController.getAll);
router.get('/:id', directorsController.getSingle);

// Protected routes
router.post('/', isAuthenticated, directorsController.createDirector);
router.put('/:id', isAuthenticated, directorsController.updateDirector);
router.delete('/:id', isAuthenticated, directorsController.deleteDirector);

module.exports = router;