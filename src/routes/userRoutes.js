const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware'); // harus ditambahkan
const userController = require('../controllers/userController');
const adminController = require('../controllers/userController'); // logoutAdmin ada di userController

// ambil user berdasarkan ID (protected)
router.get('/:id', authMiddleware, userController.getUserById);

// logout admin
router.post('/logout', authMiddleware, adminMiddleware, userController.logoutAdmin);


module.exports = router;
