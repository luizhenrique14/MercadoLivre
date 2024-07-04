const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products', productController.getProducts);
router.post('/products/add', productController.addProduct);
router.put('/products/update/:id', productController.updateProduct);
router.delete('/products/remove/:id', productController.removeProduct);

module.exports = router;
