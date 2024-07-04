const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.getCartItems);
router.post('/cart/add', cartController.addToCart);
router.put('/cart/:id', cartController.updateCartItemQuantity);
router.delete('/cart/:id', cartController.deleteCartItem);

module.exports = router;
