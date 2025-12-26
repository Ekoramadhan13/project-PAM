const { Product } = require('../../models'); // model produk
const { Op } = require('sequelize');

/**
 * Ambil semua produk
 */
exports.getAllProducts = () => {
  return Product.findAll({
    attributes: [
      'product_id',
      'name',
      'price',
      'stock',
      'category',
      'image_url'
    ]
  });
};

/**
 * Detail produk
 */
exports.getProductById = async (id) => {
  return await Product.findOne({ where: { product_id: id } });
};

/**
 * Search produk (nama & kategori)
 */
exports.searchProducts = (q, category) => {
  const where = {};

  if (q) {
    where.name = {
      [Op.like]: `%${q}%`
    };
  }

  if (category) {
    where.category = category;
  }

  return Product.findAll({ where });
};
