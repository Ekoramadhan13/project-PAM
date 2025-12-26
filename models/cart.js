'use strict';

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    cart_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
  }, {
    tableName: 'cart',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, { foreignKey: 'user_id' });
    Cart.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' }); // alias penting
  };

  return Cart;
};
