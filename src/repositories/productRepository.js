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

// ================= FIX UPDATE =================
exports.update = async (id, data) => {
  const product = await Product.findOne({
    where: { product_id: id }
  });

  if (!product) {
    return null;
  }

  await product.update(data);

  return product; // ✅ INSTANCE SEQUELIZE
};
// =============================================

exports.remove = (id) => {
  return Product.destroy({
    where: { product_id: id }
  });
};
