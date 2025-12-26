'use strict';

module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define('Orders', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    total_price: { type: DataTypes.DECIMAL(10,2), allowNull: false },
    payment_method: { type: DataTypes.ENUM('COD','OVO','DANA'), allowNull: false },
    payment_provider: { type: DataTypes.ENUM('OVO','DANA'), allowNull: true },
    status: { type: DataTypes.ENUM('Dikemas','Dikirim','Selesai'), defaultValue: 'Dikemas' },
    address: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Orders.associate = function(models) {
  Orders.hasMany(models.OrderItems, { foreignKey: 'order_id', as: 'items' }); // ubah alias menjadi 'items'
};


  return Orders;
};
