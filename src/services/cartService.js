const { Cart, Product } = require('../../models');

// Tambah produk ke keranjang
exports.addToCart = async (user_id, product_id, quantity) => {
  // Cari item di keranjang user
  const item = await Cart.findOne({ where: { user_id, product_id } });

  if (item) {
    // Update quantity saja, stok admin tetap utuh
    item.quantity += quantity;
    await item.save();
    return item;
  }

  // Tambah item baru ke keranjang
  return await Cart.create({ user_id, product_id, quantity });
};

// Lihat keranjang user
exports.getCart = async (user_id) => {
  return await Cart.findAll({
    where: { user_id },
    include: [{ model: Product, as: 'product' }] // ambil info produk, stok admin tetap utuh
  });
};

// Update jumlah produk di keranjang
exports.updateCart = async (user_id, product_id, quantity) => {
  const item = await Cart.findOne({ where: { user_id, product_id } });
  if (!item) throw new Error('Produk tidak ada di keranjang');
  item.quantity = quantity;
  return await item.save();
};

// Hapus produk dari keranjang
exports.removeFromCart = async (user_id, product_id) => {
  const item = await Cart.findOne({ where: { user_id, product_id } });
  if (!item) throw new Error('Produk tidak ada di keranjang');
  return await item.destroy();
};
