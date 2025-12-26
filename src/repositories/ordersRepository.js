const { Order, OrderItem, Cart, Product, sequelize } = require('../../models');

module.exports = {
  createOrder: async (user_id, address, payment_method, payment_provider) => {
    return await sequelize.transaction(async (t) => {
      const cartItems = await Cart.findAll({ where: { user_id }, transaction: t, include: ['product'] });
      if (!cartItems.length) throw new Error('Keranjang kosong');

      let total_price = 0;
      cartItems.forEach(item => {
        total_price += item.quantity * item.product.price;
      });

      const order = await Order.create({
        user_id,
        total_price,
        payment_method,
        payment_provider: payment_method === 'EWALLET' ? payment_provider : null,
        status: 'Dikemas',
        address
      }, { transaction: t });

      for (const item of cartItems) {
        await OrderItem.create({
          order_id: order.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price
        }, { transaction: t });

        item.product.stock -= item.quantity;
        await item.product.save({ transaction: t });
      }

      await Cart.destroy({ where: { user_id }, transaction: t });
      return order;
    });
  },

  getOrdersByUser: async (user_id) => {
    return await Order.findAll({
      where: { user_id },
      include: [{ model: OrderItem, include: ['product'] }],
      order: [['created_at', 'DESC']]
    });
  },

  getAllOrders: async () => {
    return await Order.findAll({
      include: [{ model: OrderItem, include: ['product'] }, 'user'],
      order: [['created_at', 'DESC']]
    });
  },

  updateStatus: async (order_id, status) => {
    const order = await Order.findByPk(order_id);
    if (!order) throw new Error('Order tidak ditemukan');
    order.status = status;
    return await order.save();
  }
};
