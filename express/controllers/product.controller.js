const Products = require('../models').products;
const Categories = require('../models').categories;

const getCategories = async function (req, res) {
  let err;
  [err, categories] = await to(Categories.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { categories });
}
module.exports.getCategories = getCategories;

const createProduct = async function (req, res) {
  let err;
  let body = req.body;
  [err, product] = await to(Products.create(body));
  if (err) return ReE(res, err, 422);
  return ReS(res, { product });
}
module.exports.createProduct = createProduct;

const getAllProducts = async function (req, res) {
  let err;
  [err, products] = await to(Products.findAll());
  if (err) return ReE(res, err, 422);
  return ReS(res, { products });
}
module.exports.getAllProducts = getAllProducts;

const getSingleProduct = async function (req, res) {
  let err;
  [err, productDetails] = await to(Products.findOne({
    where: {
      id: req.body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { productDetails });
}
module.exports.getSingleProduct = getSingleProduct;

const updateProduct = async function (req, res) {
  let err;
  let body = req.body;
  [err, productDetails] = await to(Products.update(body, {
    where: {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { productDetails });
}
module.exports.updateProduct = updateProduct;

const deleteProduct = async function (req, res) {
  let err;
  let body = req.body;
  [err, deleteProduct] = await to(Products.destroy({
    where: {
      id: body.id
    }
  }));
  if (err) return ReE(res, err, 422);
  return ReS(res, { deleteProduct });
}
module.exports.deleteProduct = deleteProduct;

