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

