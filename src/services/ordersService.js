const { Orders, OrderItems, Cart, Product, sequelize } = require('../../models');

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
    for (let item of cartItems) {
      if (item.quantity > item.product.stock) {
        throw new Error(`Stok produk "${item.product.name}" tidak cukup`);
      }
    }

    // Hitung total harga
    const total_price = cartItems.reduce((sum, i) => sum + i.quantity * i.product.price, 0);

    // Buat order
    const order = await Orders.create({
      user_id,
      total_price,
      payment_method,
      payment_provider,
      status: 'Dikemas',
      address
    }, { transaction: t });

    // Buat OrderItems dan kurangi stok
    for (let item of cartItems) {
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

// Lihat pesanan user
exports.getOrdersByUser = async (user_id) => {
  return await Orders.findAll({
    where: { user_id },
    order: [['created_at', 'DESC']],
    include: [{
      model: OrderItems,
      as: 'order_items',
      include: [{ model: Product, as: 'product' }]
    }]
  });
};
