const express = require('express');
const posterController = require('../controllers/posterController');

const router = express.Router();

router.post('/', posterController.createPoster);
router.get('/', posterController.readAllPosters);
router.get('/:id', posterController.readPosterById);
router.patch('/voting/:id', posterController.updateVoting);
router.patch('/:id', posterController.updatePosterById);
router.delete('/:id', posterController.deletePosterById);
module.exports = router;
