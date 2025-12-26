const { Product } = require('../../models');

exports.findAll = (filter = {}) => {
  return Product.findAll({ where: filter });
};

exports.findById = (id) => {
  return Product.findByPk(id);
};

exports.create = (data) => {
  return Product.create(data);
};

exports.update = (id, data) => {
  return Product.update(data, {
    where: { product_id: id }
  });
};

exports.remove = (id) => {
  return Product.destroy({
    where: { product_id: id }
  });
};
