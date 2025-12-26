const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware'); // user harus login

router.use(authMiddleware);

router.post('/add', cartController.addToCart);
router.get('/', cartController.getCart);
router.put('/update', cartController.updateCart);
router.delete('/remove', cartController.removeFromCart);

module.exports = router;
