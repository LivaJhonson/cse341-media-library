const express = require('express');
const router = express.Router();
const directorsController = require('../controllers/directors');

// GET all directors
router.get('/', directorsController.getAll);

// POST a new director
router.post('/', directorsController.createDirector);

// PUT (Update) a director by ID
router.put('/:id', directorsController.updateDirector);

// DELETE a director by ID
router.delete('/:id', directorsController.deleteDirector);

module.exports = router;