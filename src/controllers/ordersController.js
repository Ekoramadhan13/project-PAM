const orderService = require('../services/ordersService');

/**
 * ============================
 * CHECKOUT USER (LAMA)
 * ============================
 */
exports.checkout = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { address, payment_method, payment_provider } = req.body;

    const order = await orderService.checkout(
      user_id,
      address,
      payment_method,
      payment_provider
    );

    res.json({
      message: 'Pesanan berhasil dibuat',
      data: order
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * ============================
 * CHECKOUT USER (SELECTED)
 * ============================
 */
exports.checkoutSelected = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { address, payment_method, payment_provider, product_ids } = req.body;

    if (!product_ids || !product_ids.length) {
      throw new Error('Produk checkout wajib dipilih');
    }

    const order = await orderService.checkoutSelected(
      user_id,
      address,
      payment_method,
      payment_provider,
      product_ids
    );

    res.json({
      message: 'Pesanan berhasil dibuat',
      data: order
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * ============================
 * GET PESANAN USER
 * ============================
 */
exports.getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.id;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const orders = await orderService.getOrdersByUser(user_id);

    const result = orders.map(order => ({
      ...order.toJSON(),
      items: order.items.map(item => ({
        ...item.toJSON(),
        product: item.product
          ? {
              ...item.product.toJSON(),
              image_url: item.product.image_url
                ? `${baseUrl}${item.product.image_url}`
                : null
            }
          : null
      }))
    }));

    res.json({ data: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/**
 * ============================
 * ADMIN
 * ============================
 */
exports.getAllOrders = async (req, res) => {
  try {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const orders = await orderService.getAllOrders();

    const result = orders.map(order => ({
      ...order.toJSON(),
      items: order.items.map(item => ({
        ...item.toJSON(),
        product: item.product
          ? {
              ...item.product.toJSON(),
              image_url: item.product.image_url
                ? `${baseUrl}${item.product.image_url}`
                : null
            }
          : null
      }))
    }));

    res.json({ data: result });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;
    const order = await orderService.updateStatus(order_id, status);

    res.json({
      message: 'Status pesanan berhasil diperbarui',
      data: order
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
