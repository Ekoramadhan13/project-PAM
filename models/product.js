'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(150), allowNull: false },
    description: DataTypes.TEXT,
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    stock: { type: DataTypes.INTEGER, allowNull: false },
    category: { type: DataTypes.ENUM('Buah','Sayur'), allowNull: false },
    image_url: DataTypes.TEXT
  }, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Product.associate = function(models) {
    Product.hasMany(models.Cart, { foreignKey: 'product_id' });
  };

  return Product;
};
