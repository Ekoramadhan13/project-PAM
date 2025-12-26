const { Product } = require('../../../models');
const { Op } = require('sequelize');

/**
 * USER / PELANGGAN
 * READ ONLY
 */

exports.findAll = () => {
  return Product.findAll({
    attributes: [
      'product_id',
      'name',
      'price',
      'stock',
      'image_url',
      'category'
    ],
    order: [['created_at', 'DESC']]
  });
};

exports.findById = (id) => {
  return Product.findOne({
    where: { product_id: id }
  });
};

exports.search = (keyword, category) => {
  const whereClause = {};

  if (keyword) {
    whereClause.name = {
      [Op.like]: `%${keyword}%`
    };
  }

  if (category) {
    whereClause.category = category;
  }

  return Product.findAll({ where: whereClause });
};
