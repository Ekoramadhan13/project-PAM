const express = require('express');
const router = express.Router();

// Import controller
const userProductController = require('../controllers/userProductController');

// USER - lihat semua produk
router.get('/', userProductController.getAll);

// USER - search produk
router.get('/search', userProductController.search);

// USER - detail produk
router.get('/:id', userProductController.getDetail);

module.exports = router;
