const cartRepository = require('../repositories/cartRepository');

// POST /api/user/cart/add
exports.addToCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, amount } = req.body;

    const cart = await cartRepository.addToCart(user_id, product_id, amount);
    res.json({ message: 'Produk berhasil ditambahkan ke keranjang', data: cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/user/cart
exports.getCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const cart = await cartRepository.getCart(user_id);
    res.json({ data: cart });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/user/cart/update
exports.updateCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id, action, amount } = req.body;

    const updated = await cartRepository.updateCart(user_id, product_id, action, amount);
    if (!updated) return res.json({ message: 'Produk dihapus karena quantity 0' });

    res.json({ message: 'Keranjang berhasil diupdate', data: updated });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/user/cart/remove
exports.removeFromCart = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { product_id } = req.body;

    await cartRepository.removeFromCart(user_id, product_id);
    res.json({ message: 'Produk berhasil dihapus dari keranjang' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
