const express = require('express');
const posterController = require('../controllers/posterController');
const authCheck = require('../middleware/authMiddleware.js'); // This must be a function!

const router = express.Router();

router.post('/',authCheck, posterController.createPoster);
router.get('/',authCheck, posterController.readAllPosters);
router.get('/:id',authCheck, posterController.readPosterById);
router.patch('/voting/:id',authCheck, posterController.updateVoting);
router.patch('/:id',authCheck, posterController.updatePosterById);
router.delete('/:id',authCheck, posterController.deletePosterById);
module.exports = router;
