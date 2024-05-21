var express = require('express');
var router = express.Router();

const ProductsController = require('../controllers/product.controller');
router.get('/getCategories', ProductsController.getCategories);
router.get('/createProduct', ProductsController.createProduct);
router.get('/getAllProducts', ProductsController.getAllProducts);
router.get('/getSingleProduct', ProductsController.getSingleProduct);
router.get('/updateProduct', ProductsController.updateProduct);
router.get('/deleteProduct', ProductsController.deleteProduct);

module.exports = router;