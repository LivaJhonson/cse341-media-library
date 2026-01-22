const express = require('express');
const router = express.Router();
const directorsController = require('../controllers/directors');

router.get('/', directorsController.getAll);
router.post('/', directorsController.createDirector);

module.exports = router;