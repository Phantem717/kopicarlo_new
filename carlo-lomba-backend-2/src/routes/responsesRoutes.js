const express = require('express');
const ResponsesController = require('../controllers/responsesController');

const router = express.Router();

// Specific routes FIRST
router.get('/count', ResponsesController.countAll);
router.get('/phone/:phone_number', ResponsesController.readByPhoneNumber);
router.post('/confirm', ResponsesController.confirmPhoneNumber);
router.post('/confirm_qr', ResponsesController.confirmQR);
// CRUD routes AFTER
router.post('/', ResponsesController.create);
router.get('/', ResponsesController.readAll);
router.get('/:id', ResponsesController.readById);
router.patch('/phone_update', ResponsesController.updateByPhone);
router.patch('/:id', ResponsesController.updateById);
router.delete('/:id', ResponsesController.deleteById);

module.exports = router;
