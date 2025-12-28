const orderService = require('../services/ordersService');

exports.checkout = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { address, payment_method, payment_provider } = req.body;
    const order = await orderService.checkout(user_id, address, payment_method, payment_provider);
    res.json({ message: 'Pesanan berhasil dibuat', data: order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.id;
    const orders = await orderService.getOrdersByUser(user_id);
    res.json({ data: orders });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json({ data: orders });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { order_id, status } = req.body;
    const order = await orderService.updateStatus(order_id, status);
    res.json({ message: 'Status pesanan berhasil diperbarui', data: order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};