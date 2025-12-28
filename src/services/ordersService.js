const { Orders, OrderItems, Cart, Product, sequelize } = require('../../models');

/**
 * ============================
 * CHECKOUT USER
 * ============================
 */
exports.checkout = async (user_id, address, payment_method, payment_provider) => {
  return await sequelize.transaction(async (t) => {

    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{ model: Product, as: 'product' }],
      transaction: t,
      lock: t.LOCK.UPDATE
    });

    if (!cartItems.length) throw new Error('Keranjang kosong');

    // Validasi stok
    for (const item of cartItems) {
      if (item.quantity > item.product.stock) {
        throw new Error(`Stok produk "${item.product.name}" tidak cukup`);
      }
    }

    // Total harga
    const total_price = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    );

    // Buat order
    const order = await Orders.create({
      user_id,
      total_price,
      payment_method,
      payment_provider,
      address,
      status: 'Dikemas'
    }, { transaction: t });

    // Order items + kurangi stok
    for (const item of cartItems) {
      await OrderItems.create({
        order_id: order.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product.price
      }, { transaction: t });

      item.product.stock -= item.quantity;
      await item.product.save({ transaction: t });
    }

    // Kosongkan keranjang
    await Cart.destroy({ where: { user_id }, transaction: t });

    return order;
  });
};

/**
 * ============================
 * PESANAN USER
 * ============================
 */
exports.getOrdersByUser = async (user_id) => {
  return await Orders.findAll({
    where: { user_id },
    order: [['created_at', 'DESC']],
    include: [
      {
        model: OrderItems,
        as: 'items', // ✅ SAMA DENGAN MODEL
        include: [
          {
            model: Product,
            as: 'product'
          }
        ]
      }
    ]
  });
};

/**
 * ============================
 * PESANAN ADMIN (SEMUA)
 * ============================
 */
exports.getAllOrders = async () => {
  return await Orders.findAll({
    order: [['created_at', 'DESC']],
    include: [
      {
        model: OrderItems,
        as: 'items', // ✅ WAJIB
        include: [
          {
            model: Product,
            as: 'product'
          }
        ]
      }
    ]
  });
};

/**
 * ============================
 * UPDATE STATUS (ADMIN)
 * ============================
 */
exports.updateStatus = async (order_id, status) => {
  const order = await Orders.findByPk(order_id);
  if (!order) throw new Error('Pesanan tidak ditemukan');

  order.status = status;
  return await order.save();
};
