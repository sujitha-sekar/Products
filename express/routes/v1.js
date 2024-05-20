var express = require('express');
var router = express.Router();

const ProductsController = require('../controllers/product.controller');
router.get('/getCategories', ProductsController.getCategories);
router.get('/createProduct', ProductsController.createProduct);

module.exports = router;