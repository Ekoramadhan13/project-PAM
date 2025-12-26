const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const authenticate = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/adminMiddleware');
const upload = require('../middlewares/uploadMiddleware');

// USER
router.get('/', productController.getAll);
router.get('/:id', productController.getById);

// ADMIN
router.post(
  '/',
  authenticate,
  isAdmin,
  upload.single('image'),
  productController.create
);

router.put(
  '/:id',
  authenticate,
  isAdmin,
  upload.single('image'),
  productController.update
);

router.delete(
  '/:id',
  authenticate,
  isAdmin,
  productController.remove
);

module.exports = router;
