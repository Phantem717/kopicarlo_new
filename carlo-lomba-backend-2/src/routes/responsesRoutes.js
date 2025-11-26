const express = require('express');
const ResponsesController = require('../controllers/responsesController');
const authCheck = require('../middleware/authMiddleware.js'); // This must be a function!

const router = express.Router();

// Specific routes FIRST
router.get('/count', authCheck,ResponsesController.countAll);
router.get('/phone/:phone_number',  authCheck,ResponsesController.readByPhoneNumber);
router.post('/confirm',  authCheck,ResponsesController.confirmPhoneNumber);
router.post('/confirm_qr',  authCheck,ResponsesController.confirmQR);
router.post('/check_qr',  authCheck,ResponsesController.checkQR);
// CRUD routes AFTER
router.post('/',  authCheck,ResponsesController.create);
router.get('/',  authCheck,ResponsesController.readAll);
router.get('/:id', authCheck, ResponsesController.readById);
router.patch('/phone_update', authCheck, ResponsesController.updateByPhone);
router.patch('/:id', authCheck, ResponsesController.updateById);
router.delete('/:id', authCheck, ResponsesController.deleteById);

module.exports = router;
