const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController')

// routers to handle product-related requests

// router.get('/', );
// router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/', productController.getProducts);
router.get('/search', productController.searchProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/related/:sku', productController.getRelatedProducts);
router.get('/:id', productController.getProductById);
module.exports = router;
