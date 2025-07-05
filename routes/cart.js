const express = require('express');
const { protect } = require('../middleware/auth');
const { validate, cartItemSchema, updateCartItemSchema } = require('../utils/validation');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

const router = express.Router();

// All cart routes require authentication
router.use(protect);

router.get('/', getCart);
router.post('/', validate(cartItemSchema), addToCart);
router.put('/:id', validate(updateCartItemSchema), updateCartItem);
router.delete('/:id', removeFromCart);
router.delete('/', clearCart);

module.exports = router;