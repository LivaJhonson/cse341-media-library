const express = require('express');
const router = express.Router();
const directorsController = require('../controllers/directors');

// GET all directors
router.get('/', directorsController.getAll);

// GET single director by ID
router.get('/:id', directorsController.getSingle);

// POST a new director
router.post('/', directorsController.createDirector);

// PUT (Update) a director by ID
router.put('/:id', directorsController.updateDirector);

// DELETE a director by ID
router.delete('/:id', directorsController.deleteDirector);

module.exports = router;