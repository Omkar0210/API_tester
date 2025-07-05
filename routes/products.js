const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { validate, productSchema } = require('../utils/validation');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories
} = require('../controllers/productController');

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);
router.get('/:id', getProduct);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin'), validate(productSchema), createProduct);
router.put('/:id', protect, authorize('admin'), validate(productSchema), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;