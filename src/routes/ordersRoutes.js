const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

router.use(authMiddleware);

// User routes
router.post('/checkout', ordersController.checkout);
router.get('/my-orders', ordersController.getUserOrders); // pastikan nama function sesuai controller

// Admin routes
router.get('/all', adminMiddleware, ordersController.getAllOrders);
router.put('/update-status', adminMiddleware, ordersController.updateOrderStatus);

module.exports = router;
