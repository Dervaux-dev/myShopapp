const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');

// Routes for /api/products
router.get('/', productController.getProducts);
router.post('/add', productController.addProduct);
router.put('/:id', productController.updateProduct);

module.exports = router;