const productRepository = require('../repositories/productRepository');

exports.getAllProducts = (category) => {
  const filter = category ? { category } : {};
  return productRepository.findAll(filter);
};

exports.getProductById = (id) => {
  return productRepository.findById(id);
};

exports.createProduct = (data) => {
  return productRepository.create(data);
};

exports.updateProduct = (id, data) => {
  return productRepository.update(id, data);
};

exports.deleteProduct = (id) => {
  return productRepository.remove(id);
};
