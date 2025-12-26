'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderItems = sequelize.define('OrderItems', {
    order_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price: { type: DataTypes.DECIMAL(10,2), allowNull: false }
  }, {
    tableName: 'order_items',
    timestamps: false
  });

 OrderItems.associate = function(models) {
  OrderItems.belongsTo(models.Orders, { foreignKey: 'order_id', as: 'order' });
  OrderItems.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
};


  return OrderItems;
};
